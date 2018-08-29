# au-kendo
https://unpkg.com/bootstrap-select@1.13.1/dist/js/bootstrap-select.js
https://unpkg.com/bootstrap-tagsinput@0.7.1/dist/js/bootstrap-tagsinput.js


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