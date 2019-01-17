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
 