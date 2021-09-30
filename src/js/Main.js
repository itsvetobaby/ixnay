import { render } from './lib/preact.js';
import { Router } from './lib/preact-router.es.js';
import { Component } from './lib/preact.js';
import { Link } from './lib/preact.match.js';
import { createHashHistory } from '../js/lib/history.production.min.js';

import Helpers from './Helpers.js';
import { html } from './Helpers.js';
import QRScanner from './QRScanner.js';
import PeerManager from './PeerManager.js';
import Session from './Session.js';
import { translate as t } from './Translation.js';

import Settings from './views/Settings.js';
import LogoutConfirmation from './views/LogoutConfirmation.js';
import Chat from './views/Chat.js';
import Mesh from './views/Mesh.js';
import Checkout from './views/Checkout.js';
import Point from './views/Point.js';
import Login from './views/Login.js';
import Profile from './views/Profile.js';
import Group from './views/Group.js';
import Message from './views/Message.js';
import Follows from './views/Follows.js';

import About from './views/About.js';
import Explorer from './views/Explorer.js';
import Contacts from './views/Contacts.js';
import Torrent from './views/Torrent.js';

import VideoCall from './components/VideoCall.js';
import Identicon from './components/Identicon.js';
import MediaPlayer from './components/MediaPlayer.js';
import Footer from './components/Footer.js';
import State from './State.js';
import Icons from './Icons.js';


var settingsIcon = html`<i class="fas fa-cog"></i>`

const userAgent = navigator.userAgent.toLowerCase();
const isElectron = (userAgent.indexOf(' electron/') > -1);
if (!isElectron && ('serviceWorker' in navigator)) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('serviceworker.js')
    .catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


var profileSvg = html`<i class="fas fa-user-alt"></i>`
var IXNAYText = html`
<div class="flex">
 
  <h1 style="font-family: arialBlack; margin-right: 0.3em">IXNAY</h1>
  <div class="flex" style="margin-top: 7px">

    <div class=" flex items-center justify-center h-7 w-3 rounded-sm bg-black text-white">
    </div>
    <div class=" flex items-center justify-center h-7 w-3 mx-0.5 rounded-sm bg-black text-white">
    </div>
    <div class=" flex items-center justify-center h-7 w-3 rounded-sm bg-black text-white">
    </div>
  </div>

</div>
`

var home =  html`<div style="display: flex;margin-left: 0px; ">
<div class="smolbar3"></div>
<div class="smolbar3"></div>
<div class="smolbar3"></div>
</div>`;

State.init();
Session.init({autologin: window.location.hash.length > 2});
PeerManager.init();

Helpers.checkColorScheme();

const APPLICATIONBRAND = [ // TODO: move editable shortcuts to localState gun
  {url: '/', text: IXNAYText, icon: Icons.home , classCss: " hideWhite"},
];


const APPLICATIONS = [ // TODO: move editable shortcuts to localState gun

  {url: '/mesh', text: "Greenhouse", icon: Icons.store , classCss: "null btn grow"},
  {url: '/settings', text: profileSvg, icon: Icons.settings , classCss: "null btn grow"},

];



class Menu extends Component {
  componentDidMount() {
    State.local.get('unseenTotal').on(unseenTotal => {
      this.setState({unseenTotal});
    });
  }

  menuLinkClicked() {
    State.local.get('toggleMenu').put(false);
    State.local.get('scrollUp').put(true);
  }

  render() {
    const pub = Session.getPubKey();
    return html`
      <div class="relative bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
          <div class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div class="flex justify-start lg:w-0 lg:flex-1">
              ${APPLICATIONBRAND.map(a => {
                if (a.url) {
                  return html`
                    <${a.native ? 'a' : Link} onClick=${() => this.menuLinkClicked()} activeClassName="active" href=${a.url}>
                      <span class="whitespace-nowrap text-base font-black text-4xl text-black-500 hover:text-gray-900" >${a.text}</span>
                    <//>`;
                } else {
                  return html`<br/><br/>`;
                }
              })}
            </div>
            <div class="hidden md:flex space-x-10">

              ${APPLICATIONS.map(b => {
                if (b.url) {
                  return html`
                    <${b.native ? 'a' : Link} class="text-base font-medium text-gray-500 hover:text-gray-900" onClick=${() => this.menuLinkClicked()} activeClassName="active" href=${b.url}>
                      <span>${b.text}</span>
                    <//>`;
                } else {
                  return html`<br/><br/>`;
                }
              })}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

class Main extends Component {
  componentDidMount() {
    State.local.get('loggedIn').on(loggedIn => this.setState({loggedIn}));
    State.local.get('toggleMenu').put(false);
    State.local.get('toggleMenu').on(show => this.toggleMenu(show));
    State.electron && State.electron.get('platform').on(platform => this.setState({platform}));
  }

  handleRoute(e) {
    let activeRoute = e.url;
    if (!activeRoute && window.location.hash) {
      return route(window.location.hash.replace('#', '')); // bubblegum fix back navigation
    }
    document.title = 'IXNAY';
    if (activeRoute && activeRoute.length > 1) { document.title += ' - ' + Helpers.capitalize(activeRoute.replace('/', '')); }
    State.local.get('activeRoute').put(activeRoute);
    QRScanner.cleanupScanner();
  }

  onClickOverlay() {
    if (this.state.showMenu) {
      this.setState({showMenu: false});
    }
  }

  toggleMenu(show) {
    this.setState({showMenu: typeof show === 'undefined' ? !this.state.showMenu : show});
  }

  electronCmd(name) {
    State.electron.get('cmd').put({name, time: new Date().toISOString()});
  }

  render() {
    let content = '';
    const isDesktopNonMac = this.state.platform && this.state.platform !== 'darwin';
    if (this.state.loggedIn || window.location.hash.length <= 2) {
      content = this.state.loggedIn ? html`
        ${isDesktopNonMac ? html`
          <div class="windows-titlebar">
               <img src="img/iris_logotype.png" height=16 width=28 />
               <div class="title-bar-btns">
                    <button class="min-btn" onClick=${() => this.electronCmd('minimize')}>-</button>
                    <button class="max-btn" onClick=${() => this.electronCmd('maximize')}>+</button>
                    <button class="close-btn" onClick=${() => this.electronCmd('close')}>x</button>
               </div>
          </div>
        ` : ''}
        <div class="${isDesktopNonMac ? 'desktop-non-mac' : ''} ${this.state.showMenu ? 'menu-visible-xs' : ''}">
          <${Menu}/>
          <div class="overlay" onClick=${e => this.onClickOverlay(e)}></div>
          <div class="">
            <${Router} history=${createHashHistory()} onChange=${e => this.handleRoute(e)}>

            <${Login} path="/login"/>
            <${Chat} path="/chat/:id?"/>
            <${Message} path="/post/:hash"/>
            <${Torrent} path="/torrent/:id"/>
            <${About} path="/"/>
            <${About} path="/home"/>
            <${Settings} path="/settings"/>
            <${LogoutConfirmation} path="/logout"/>
            <${Profile} path="/profile/:id?" tab="profile"/>
            <${Profile} path="/replies/:id?" tab="replies"/>
            <${Profile} path="/likes/:id?" tab="likes"/>
            <${Profile} path="/media/:id" tab="media"/>
            <${Group} path="/group/:id?"/>

            <${Mesh} path="/mesh/:mesh?"/>
            <${Checkout} path="/checkout/:mesh?"/>
            <${Point} path="/point/:point/:mesh"/>
            <${Point} path="/point/new" mesh=Session.getPubKey()/>

            <${Explorer} path="/explorer/:node"/>
            <${Explorer} path="/explorer"/>
            <${Follows} path="/follows/:id"/>
            <${Follows} followers=${true} path="/followers/:id"/>
            <${Contacts} path="/contacts"/>
            </${Router}>
          </div>
        </div>
        <${Footer}/>
        <${VideoCall}/>
      ` : html`<${Login}/>`;
    }
    return html`
      <div class="container mx-auto px-0" id="main-content">
        ${content}
      </div>
    `;
  }
}

render(html`<${Main}/>`, document.body);

document.body.style = 'opacity:1';

Helpers.showConsoleWarning();
