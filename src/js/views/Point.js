import { html } from '../Helpers.js';
import State from '../State.js';
import Session from '../Session.js';
import {translate as t} from '../Translation.js';
import { route } from '../lib/preact-router.es.js';
import MeshView from './Mesh.js';

class Point extends MeshView {
  constructor() {
    super();
    this.eventListeners = [];
    this.followedUsers = new Set();
    this.followers = new Set();

    this.state = {subs:{}};
    this.subs = {};
  }

  addToCart() {
    const count = (this.cart[this.props.point] || 0) + 1;
    State.local.get('cart').get(this.props.mesh).get(this.props.point).put(count);
  }

  typeMethodChanged(e) {
    const val = e.target.firstChild && e.target.firstChild.value;
    val && State.local.get('type').put(val);
  }


  newPoint() {
    console.log('new');
    return html`
      <div class="" id="profile">
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="border-t border-gray-200">
              <dl>
                <div class="bg-black text-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium">
                    Create New Blueprint
                  </dt>
                </div>
                <div class="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Name
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div class="">
                      <div class="text-sm font-medium text-gray-900">
                        <h2 contenteditable placeholder="Item name" onInput=${e => this.newPointName = e.target.innerText} />
                      </div>
                    </div>
                  </dd>
                </div>
                <div class="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                      Description
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <textarea placeholder="Item description" onInput=${e => this.newPointDescription = e.target.value} style="resize: vertical"/>
                  </dd>
                </div>
                <div class="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Price
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <input type="number" placeholder="Price" onInput=${e => this.newPointPrice = parseInt(e.target.value)}/>
                  </dd>
                </div>
                <div class="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">

                  <p>
                    <label for="Manufacture" onClick=${e => this.typeMethodChanged(e)}>
                      <input class="funkyradio" type="radio" name="type" id="Manufacture" value="Manufacture" checked=${this.state.type === 'Blueprint'}/>
                      Manufacture
                    </label>
                  </p>
                  <p>
                    <label for="Agriculture" onClick=${e => this.typeMethodChanged(e)}>
                      <input class="funkyradio" type="radio" name="type" id="Agriculture" value="Agriculture" checked=${this.state.type === 'Transformer'}/>
                      Agriculture
                    </label>
                  </p>
                </div>
              </dl>
            </div>
          </div>
        <br/><br/>
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="border-t border-gray-200">
            <dl>
              <div class="bg-blue-200 text-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <button onClick=${e => this.addItemClicked(e)}>Add item</button>
              </div>
            </dl>
          </div>
        </div>

      </div>
    `;
  }

  onClickDelete() {
    if (confirm('Delete point? This cannot be undone.')) {
      State.public.user().get('mesh').get('points').get(this.props.point).put(null);
      route('/mesh/' + this.props.mesh);
    }
  }

  showPoint() {
    const cartTotalItems = Object.values(this.cart).reduce((sum, current) => sum + current, 0);
    const i = this.state.point;

    if (!i) return html``;
      return html`
      <div id="profile">
        ${this.state.point ? html`
            <div class="flex flex-col">
              <div class="px-4 py-5 sm:px-6">
                <h1 class="text-lg leading-9 font-medium text-gray-900">
                  Blueprint
                </h1>
                <h1 class=" float-right text-5xl font-black leading-9 font-medium text-black">
                  <iris-text contenteditable="true"  user=${this.props.mesh} path="mesh/points/${this.props.point}/name"/>
                </h1>
                <p class="mt-1 text-sm text-gray-500">
                  The plans for fabrication of this item. Available data will be displaiedd, confidencial data will not be shown.
                </p>
              </div>
            </div>

            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3"><a href="/mesh/${this.props.mesh}"><iris-text editable="false" path="profile/name" user=${this.props.mesh}/></a></button>

            


          ${cartTotalItems ? html`

              <button class="buttonS -regular center mx-3" onClick=${() => route('/checkout/' + this.props.mesh)}>Shopping cart (${cartTotalItems})</button>

          ` : ''}

          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3" onClick=${() => this.addToCart()}>
            ${t('add_to_cart')}
            ${this.cart[this.props.point] ? ` (${this.cart[this.props.point]})` : ''}
          </button>
          ${this.isMyProfile ? html`
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3" onClick=${e => this.onClickDelete(e)}>Delete item</button>
            ` : ''}
        `: ''}

        <br/>

        <input placeholder="Sub point ID" id="pointID" onInput=${e => this.newSubID = e.target.value}/>
        <button onClick=${() => {
    

          var globals = Gun()

          var makeID  = this.newSubID
          var masterPoint = this.props.point



          var compositeSub = {
            makeID: this.newSubID
          }

          var getFromGlobal = globals.get(masterPoint).get(this.newSubID)
          getFromGlobal.map().on(v => {console.log(v)})



          // globals.get(masterPoint).get("subs").set(compositeSub)        
          // var getPls = globals.get(masterPoint).get("subs")

          // getPls.map().on(v => {console.log(v)})

          console.log("done")
        }}>Add item</button>
          
        ${Object.keys(this.state.subs).map(k => {
          const i = this.state.subs[k];
          return html`

                  <button onClick=${() => { 
                    var globals = Gun();
                    var masterPoint = this.props.point

                    var getName = i.makeID;
                    console.log(getName)
                    globals.get(masterPoint).get("subs").get(getName).put(null);
                    route('/mesh/');
                  }}> Delete</button>
        
          `
        })}


        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="border-t border-gray-200">
                <div class="bg-black text-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium">
                      Blueprint Info
                  </dt>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                      Maker Name
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    <button class="btn btn-blue"><a href="/mesh/${this.props.mesh}"><iris-text editable="false" path="profile/name" user=${this.props.mesh}/></a></button>
                  </dd>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                
                  </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                      Blueprint Name
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    <iris-text contenteditable="true"  user=${this.props.mesh} path="mesh/points/${this.props.point}/name"/>
                  </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                      ID
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    <iris-text contenteditable="false" placeholder="Price" user=${this.props.mesh} path="mesh/points/${this.props.point}/pointID"/>
                  </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                      Issue
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><a href="/mesh/${this.props.mesh}"> <iris-text placeholder="Price" user=${this.props.mesh} path="mesh/points/${this.props.point}/type"/></a></button>
                  </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                      Price
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    <iris-text placeholder="Price" user=${this.props.mesh} path="mesh/points/${this.props.point}/price"/>
                  </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                      Description
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    <iris-text user=${this.props.mesh} path="mesh/points/${this.props.point}/description"/>
                  </dd>
                </div>
            </div>
        </div>
        <br/><br/>
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="border-t border-gray-200">
            <div class="bg-black text-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium">
                Resources
              </dt>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">
                  Photo
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <iris-img class="" style="  padding: 0px;" user=${this.props.mesh} path="mesh/points/${this.props.point}/photo"/>
              </dd>
            </div>
          </div>
        </div>
        <br/><br/>
      </div>
    `;
  }

  render() {
    return (this.props.mesh && this.props.point ? this.showPoint() : this.newPoint());
  }

  componentWillUnmount() {
    this.eventListeners.forEach(e => e.off());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.point !== this.props.point) {
      this.componentDidMount();
    }
  }

  addItemClicked() {
    var randInt = '0' + "." + (Math.floor(Math.random() * (999 - 111 + 1) + 111)) + "." + (Math.floor(Math.random() * (999 - 111 + 1) + 111)) + "." + (Math.floor(Math.random() * (999 - 111 + 1) + 111))


    this.newPointID = randInt

    var globals = Gun()

    const point = {
      pointID: this.newPointID,
      name: this.newPointName,
      description: this.newPointDescription,
      price: this.newPointPrice,
      type: this.state.type ,
    };
    console.log(point)
    State.public.user().get('mesh').get('points').get(this.newPointID).put(point);
    globals.get(this.newPointID).put(point)
      

    route(`/mesh/${Session.getPubKey()}`)
  }

  componentDidMount() {
    var globals = Gun();
    var masterPoint = this.props.point

    State.local.get('type').on(type => this.setState({type}));



    MeshView.prototype.componentDidMount.call(this);
    const pub = this.props.mesh;
    this.eventListeners.forEach(e => e.off());
    this.setState({followedUserCount: 0, followerCount: 0, name: '', photo: '', about: ''});
    this.isMyProfile = Session.getPubKey() === pub;
    if (this.props.point && pub) {
      State.public.user(pub).get('mesh').get('points').get(this.props.point).on(point => this.setState({point}));
    }

    if (pub) {
      var getPls = globals.get(masterPoint).get("subs")

      getPls.map().on((g, up) => {
        if (g) {
          const a = {};
          a[up] = g;
          Object.assign(this.subs, a);
          this.updateTotalPrice();
        } else {
          delete this.subs[up];
        }
        this.setState({subs: this.subs});
      });
    }
  }
}

export default Point;
