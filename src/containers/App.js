import React, {Component} from 'react';
import { connect } from 'react-redux';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';
import '../style.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      selected: false
    }

    this.selectWeather = this.selectWeather.bind(this);
    this.handlerClick = this.handlerClick.bind(this);
  }

  componentDidMount(){
    this.props.onGetWeather()
  }

  pasteHtmlAtCaret(html) {
      var sel, range;
      if (window.getSelection) {
          // IE9 and non-IE
          sel = window.getSelection();
          if (sel.getRangeAt && sel.rangeCount) {
              range = sel.getRangeAt(0);
              range.deleteContents();

              // Range.createContextualFragment() would be useful here but is
              // non-standard and not supported in all browsers (IE9, for one)
              var el = document.createElement("div");
              el.innerHTML = html;
              var frag = document.createDocumentFragment(), node, lastNode;
              while ( (node = el.firstChild) ) {
                  lastNode = frag.appendChild(node);
              }
              range.insertNode(frag);

              // Preserve the selection
              if (lastNode) {
                  range = range.cloneRange();
                  range.setStartAfter(lastNode);
                  range.collapse(true);
                  sel.removeAllRanges();
                  sel.addRange(range);
              }
          }
      } else if (document.selection && document.selection.type != "Control") {
          // IE < 9
          document.selection.createRange().pasteHTML(html);
      }
  }

  selectWeather(weather){
    this.setState({selected: weather})
  }

  handlerClick(){
    if(this.state.selected){
      const hours = new Date().getHours();
      const isDayTime = hours > 6 && hours < 22;
      this.pasteHtmlAtCaret(`&nbsp;<span class='${isDayTime ? 'day' : 'night'}'>${this.state.selected.city} - <b>${this.state.selected.temp} °C</b></span>&nbsp;`)
      this.setState({selected: false})
    }
  }

  render(){
    const { weather } = this.props;
    const { selected } = this.state;
    return <div className="app">
              <LeftPanel
                weather={weather}
                selected={selected}
                selectWeather={this.selectWeather} />
              <RightPanel
                selected={selected}
                handlerClick={this.handlerClick} />
          </div>;
  }
}

export default connect(
  state => ({
    weather: state.mainState.weather
  }),
  dispatch => ({
    onGetWeather:() => {
      dispatch({type: 'GET_WEATHER'})
    },
  })
)(App);
