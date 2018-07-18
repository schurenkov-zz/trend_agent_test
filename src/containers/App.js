import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';
import '../style.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      focus: false
    }

    this.selectWeather = this.selectWeather.bind(this);
    this.handlerFocus = this.handlerFocus.bind(this);
    this.handlerBlur = this.handlerBlur.bind(this);

    this.LeftPanel = React.createRef();
    this.RightPanel = React.createRef();
  }

  componentDidMount(){
    this.props.onGetWeather()
    document.addEventListener('click', this.handleClickOutside.bind(this), false);
  }

  pasteHtmlAtCaret(html, selectPastedContent) {
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // only relatively recently standardized and is not supported in
            // some browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            var firstNode = frag.firstChild;
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                if (selectPastedContent) {
                    range.setStartBefore(firstNode);
                } else {
                    range.collapse(true);
                }
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if ( (sel = document.selection) && sel.type != "Control") {
        // IE < 9
        var originalRange = sel.createRange();
        originalRange.collapse(true);
        sel.createRange().pasteHTML(html);
        if (selectPastedContent) {
            range = sel.createRange();
            range.setEndPoint("StartToStart", originalRange);
            range.select();
        }
    }
  }

  selectWeather(weather){
    if(this.state.focus){
      const hours = new Date().getHours();
      const isDayTime = hours > 6 && hours < 22;
      this.pasteHtmlAtCaret(`&nbsp;<span class='${isDayTime ? 'day' : 'night'}'>${weather.city} - <b>${weather.temp} °C</b></span>&nbsp;`)
    }
  }

  handleClickOutside(event) {
      const RightPanel = ReactDOM.findDOMNode(this.RightPanel.current);
      const LeftPanel = ReactDOM.findDOMNode(this.LeftPanel.current);

      if ((!RightPanel || !RightPanel.contains(event.target)) && (!LeftPanel || !LeftPanel.contains(event.target))) {
        this.setState({focus: false})
        document.getElementById('textarea').blur();
      }
  }

  handlerBlur(){
    if(this.state.focus){
      document.getElementById('textarea').focus();
    }else{
      document.getElementById('textarea').blur();
    }
  }

  handlerFocus(){
    if(!this.state.focus){
      this.setState({focus: true})
    }
  }

  render(){
    const { weather } = this.props;
    return <div className="app">
              <LeftPanel
                ref={this.LeftPanel}
                weather={weather}
                selectWeather={this.selectWeather} />
              <RightPanel
                ref={this.RightPanel}
                handlerFocus={this.handlerFocus}
                handlerBlur={this.handlerBlur}/>
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
