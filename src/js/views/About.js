import {translate as t} from '../Translation.js';
import { html } from '../Helpers.js';
import View from './View.js';

class About extends View {
  constructor() {
    super();
    this.id = "settings";
  }

  renderView() {
    return html`
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Off the grid</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            We're here to Bootstrap Autonomy
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Order, make, and visualise orders for anything. 
          </p>
        </div>
    
        <div class="mt-10">
          <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div class="relative">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-4 rounded-md bg-indigo-500 text-white">
     
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Standarded Blueprints</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Orders via blueprints. A standardisation of a design. When you need a different varient of the blueprint just clone and edit the blueprint, a new code is created and able to be sent to manufactuers. All codes and the blueprints they represent are open source for anyone to use.
              </dd>
            </div>
    
            <div class="relative">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-4 rounded-md bg-indigo-500 text-white">
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Distributed and Libre</p>

              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Data is kept through peers, and the code base is OSS.
              </dd>
            </div>
    
            <div class="relative">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-4 rounded-md bg-indigo-500 text-white">
     
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Intelligent</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Ixnay learns off ordersheets, and optimises for a base purpose of making any given area autonomous.
              </dd>
            </div>
    
            <div class="relative">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-4 rounded-md bg-indigo-500 text-white">

                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Plugable</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                We're here to feed and pull data. Use our API to expand Ixnay.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
    `;
  }
}

export default About;
