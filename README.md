#feb 27
Install slickgrid in FEC
https://unpkg.com/slickgrid
which redirects to https://unpkg.com/slickgrid@2.4.3/slick.core.js
directory view = https://unpkg.com/slickgrid@2.4.3/

package
 "aurelia-slickgrid": "^2.6.0",

#feb 20 2019
must use _ for lodash ref
"aurelia-binding": "2.2.1",
      "aurelia-binding": "1.7.1",
bug with     "aurelia-binding": "2.1.5", and kendoui revert back to "aurelia-binding": "1.7.1",
need the following in main.js for   .plugin('aurelia-bootstrap-select')
import 'jquery';
import 'bootstrap';

issue
------- File not found or not accessible ------
| Location: /home/circleci/repo/src/jquery.js
| Requested by: /home/circleci/repo/src/main.js
| Is this a package? Make sure that it is configured in aurelia.json and that it is not a Node.js package

Aurelia-CLI

For CLI you will need to add (bootstrap-select and aurelia-bootstrap-select) to your aurelia.json file. The exported class is abp-select.
fixabpSelect
===================== Try to keep
https://github.com/ghiscoding/Aurelia-Bootstrap-Plugins/tree/master/aurelia-bootstrap-select
abp-select
<abp-select collection.bind="allCampingStuff" selected-value.bind="camping" selected-item.bind="campingValue"></abp-select>
<!-- from his website -->
{
  "name": "bootstrap-select",
  "main": "dist/js/bootstrap-select.js",
  "path": "../node_modules/bootstrap-select",
  "resources": [
    "dist/css/bootstrap-select.min.css"
  ]
},
{
  "name": "aurelia-bootstrap-select",
  "main": "index",
  "path": "../node_modules/aurelia-bootstrap-select/dist/amd",
  "resources": [
    "**/*.{css,html}"
  ]
},
<!--  -->


===============================================================

====== tochoromero/aurelia-bootstrap aubs ====================
\action\promtp.html <!-- fix-aubs  -->
\action\search-results.html <!-- fix-aubs  -->
\batchupdate\search-results.html (many controls)  <!-- fix-aubs  -->
\contact\prompt.html <!-- fix-aubs  -->
\inventory\inventory.html (many) <!-- fix-aubs  -->
\inventory\prompt.html (many) <!-- fix-aubs  -->

delete fix-aubs  <!-- fix-aubs  -->
===================================================================================================
tochoromero/aurelia-bootstrap
"velocity-animate",
"tether",
{
  "name": "aurelia-bootstrap",
  "path": "../node_modules/aurelia-bootstrap/dist/amd",
  "main": "index",
  "resources": [
    "**/*.html"
  ]
}
<aubs-typeahead ref='InventoryLocation' data.bind="appService.codesInventoryLocation" value.bind="DescriptionLoc" debounce.bind="350"
									 placeholder="not avail -codesInventoryLocation" open-on-focus.bind="true" key="Description" results-limit.bind="12"
									 select-single-result.bind="true">
									</aubs-typeahead>
======
delete
===================================================================================================



# au-kendo
https://unpkg.com/bootstrap-select@1.13.1/dist/js/bootstrap-select.js
deprecated and not supported https://unpkg.com/bootstrap-tagsinput@0.7.1/dist/js/bootstrap-tagsinput.js
https://unpkg.com/npm:moment@2.22.2


find unpkg
https://unpkg.com/select2@4.0.6-rc.1/dist/js/select2.js
http://nthrbldyblg.blogspot.com/2017/01/aurelia-and-select2.html
https://ilikekillnerds.com/2015/08/aurelia-custom-element-using-select2-tutorial/


https://gist.github.com/mujimu


use in package.json
 "select2": {
      "map": "npm:select2@4.0.6-rc.1/dist",
      "package": {
        "defaultExtension": "js",
        "main": "js/select2.js"
      },


https://github.com/selectize/selectize.js
https://unpkg.com/selectize@0.12.6/dist/js/selectize.js
form footer
see inventory/data-form.html
	<div class="flex-column-none section-footer">
				<!-- ${footer} -->

				<span>&nbsp;&nbsp;
					<button class="btn btn-sm btn-danger" click.delegate="saveinventory(0)">
						Save & Stay
					</button>
					<button class="btn btn-sm btn-danger" click.delegate="saveinventory(1)">
						Save & Close
					</button>
				</span>
				<!-- <button class="btn btn-sm btn-danger" click.delegate="addinventory()">
						Add Inventory
					</button> -->
				<button class="btn btn-sm btn-danger" click.delegate="factsheet()">
					FactSheet
				</button>

				<span>&nbsp;&nbsp;
					<button class="btn btn-sm btn-danger" click.delegate="requestclose()">
						Close
					</button>
				</span>
			</div>

      Aug 2018
      Changed shell to app in main.js and app.js has 
        <footer class="flex-row-none">
          FOOTER--
        </footer>
      version info in home view

      todo
      1. Fix FactSheet processing DELANE0215 LEWIS00114 HOFMAN0015 BONTEC0051 GROSSM0029
      2. Import data catalog again and document
      3. Check Look-Feel
      4. Contact
 