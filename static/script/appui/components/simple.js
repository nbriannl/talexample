/**
* @preserve Copyright (c) 2013 British Broadcasting Corporation
* (http://www.bbc.co.uk) and TAL Contributors (1)
*
* (1) TAL Contributors are listed in the AUTHORS file and at
*     https://github.com/fmtvp/TAL/AUTHORS - please extend this file,
*     not this notice.
*
* @license Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* All rights reserved
* Please contact us for an alternative licence
*/

define(
  'sampleapp/appui/components/simple',
  [
    'antie/widgets/component',
    'antie/widgets/button',
    'antie/widgets/label',
    'antie/widgets/verticallist',
    'antie/widgets/carousel',
    'antie/datasource',
    'sampleapp/appui/formatters/simpleformatter',
    'sampleapp/appui/datasources/simplefeed'
  ],
  function (Component, Button, Label, VerticalList, Carousel, DataSource, SimpleFormatter, SimpleFeed) {
    // All components extend Component
    return Component.extend({
      init: function init () {
        var self = this

        // It is important to call the constructor of the superclass
        init.base.call(this, 'simplecomponent')

        // Add the labels to the component
        var helloWorldLabel = new Label('helloWorldLabel', 'Hello World')
        this.appendChildWidget(helloWorldLabel)

        var welcomeLabel = new Label('welcomeLabel', 'Welcome to your first TAL application!')
        this.appendChildWidget(welcomeLabel)

        var newCarouselButton = this._createCarouselButton()

        var playerButton = new Button()
        playerButton.addEventListener('select', function (evt) {
          self.getCurrentApplication().pushComponent('maincontainer', 'sampleapp/appui/components/simplevideocomponent')
        })
        playerButton.appendChildWidget(new Label('Simple Video Player Example'))

        // Create a vertical list and append the buttons to navigate within the list
        var verticalListMenu = new VerticalList('mainMenuList')
        verticalListMenu.appendChildWidget(newCarouselButton)
        verticalListMenu.appendChildWidget(playerButton)
        this.appendChildWidget(verticalListMenu)
      },

      _createCarouselButton: function () {
        var self = this
        function carouselExampleSelected () {
          self.getCurrentApplication().pushComponent(
            'maincontainer',
            'sampleapp/appui/components/carouselcomponent',
            self._getCarouselConfig()
          )
        }

        var button = new Button('carouselButton')
        button.appendChildWidget(new Label('Carousel Example'))
        button.addEventListener('select', carouselExampleSelected)
        return button
      },

      _getCarouselConfig: function () {
        return {
          description: 'Carousel example, LEFT and RIGHT to navigate, SELECT to go back',
          dataSource: new DataSource(null, new SimpleFeed(), 'loadData'),
          formatter: new SimpleFormatter(),
          orientation: Carousel.orientations.HORIZONTAL,
          carouselId: 'verticalCullingCarousel',
          animOptions: {
            skipAnim: false
          },
          alignment: {
            normalisedAlignPoint: 0.5,
            normalisedWidgetAlignPoint: 0.5
          },
          initialItem: 4,
          lengths: 264
        }
      }
    })
  }
)
