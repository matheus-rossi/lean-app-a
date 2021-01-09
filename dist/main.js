(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\mathe\Documents\Development\Angular\lean-app-a\src\main.ts */"zUnb");


/***/ }),

/***/ "0H1/":
/*!*************************************************************************!*\
  !*** ./src/app/application/quality/pareto/include/include.component.ts ***!
  \*************************************************************************/
/*! exports provided: ParetoIncludeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParetoIncludeComponent", function() { return ParetoIncludeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @po-ui/ng-components */ "wBT/");
/* harmony import */ var c3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! c3 */ "LV99");
/* harmony import */ var c3__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(c3__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "LvDl");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var ngx_resize_observer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-resize-observer */ "16Lg");








class ParetoIncludeComponent {
    constructor(poDialog, poNotification) {
        this.poDialog = poDialog;
        this.poNotification = poNotification;
        this.columns = [
            { property: 'description', type: 'string', label: 'Descrição' },
            { property: 'quantity', type: 'number', label: 'Quantidade' }
        ];
        this.items = [
            {
                description: 'Objeto de Estudo 1',
                quantity: 80
            },
            {
                description: 'Objeto de Estudo 2',
                quantity: 200
            },
            {
                description: 'Objeto de Estudo 3',
                quantity: 50
            }
        ];
    }
    ngOnInit() {
        this.items.sort(this.compareItems);
        this.itemsAr = this.paretoCalculation(this.items);
        this.generateChart();
    }
    addOperation() {
        if (this.description && this.quantity !== null) {
            const data = this.items;
            const index = data.map(d => d.description).indexOf(this.description);
            if (index === -1) {
                const newItem = {
                    description: this.description,
                    quantity: this.quantity
                };
                this.items.push(newItem);
                this.items.sort(this.compareItems);
                this.itemsAr = this.paretoCalculation(this.items);
            }
            this.resetItems();
            this.generateChart();
        }
        else {
            const poNotification = {
                message: 'Campos inválidos, favor verificar as informações',
                duration: 3000
            };
            this.poNotification.warning(poNotification);
        }
    }
    deleteOperation() {
        const selectedItems = this.poTable.getSelectedRows();
        if (selectedItems.length > 0) {
            this.poDialog.confirm({
                title: 'Remover itens',
                literals: { cancel: 'Cancelar', confirm: 'Sim' },
                message: `Você gostaria de remover esses ${selectedItems.length} itens da lista?`,
                confirm: () => {
                    this.removeSelectedItems(selectedItems);
                    this.generateChart();
                },
                cancel: () => { }
            });
        }
    }
    removeSelectedItems(selectedItems) {
        this.items = this.items.filter(item => !selectedItems.includes(item));
        this.itemsAr = this.paretoCalculation(this.items);
    }
    compareItems(a, b) {
        if (a.quantity > b.quantity) {
            return -1;
        }
        if (a.quantity < b.quantity) {
            return 1;
        }
        return 0;
    }
    resetItems() {
        this.description = null;
        this.quantity = null;
    }
    paretoCalculation(paretoAr) {
        const paretoArray = paretoAr.sort(this.compareItems);
        const patternX = [
            ['x']
        ];
        const patternQtd = [
            ['Quantidade']
        ];
        const patternAcc = [
            ['% Acumulado']
        ];
        const patternXFinal = paretoArray.map(item => item.description);
        const patternQtdFinal = paretoArray.map(item => item.quantity);
        const totalPercent = patternQtdFinal.reduce((acc, curr) => acc + curr, 0);
        const itemPercent = patternQtdFinal.map(item => Math.round((item / totalPercent) * 100));
        const patternAccAlmost = itemPercent
            .reduce((r, c, i) => {
            r.push((r[i - 1] || 0) + c);
            return r;
        }, []);
        const finalPatternAcc = lodash__WEBPACK_IMPORTED_MODULE_3__["flattenDeep"](patternAcc.concat(patternAccAlmost));
        const finalPatternX = lodash__WEBPACK_IMPORTED_MODULE_3__["flattenDeep"](patternX.concat(patternXFinal));
        const finalPatternQtd = lodash__WEBPACK_IMPORTED_MODULE_3__["flattenDeep"](patternQtd.concat(patternQtdFinal));
        return {
            finalPatternX,
            finalPatternQtd,
            finalPatternAcc
        };
    }
    generateChart() {
        setTimeout(() => {
            return c3__WEBPACK_IMPORTED_MODULE_2__["generate"]({
                bindto: '#chart',
                data: {
                    x: 'x',
                    columns: [
                        this.itemsAr.finalPatternX,
                        this.itemsAr.finalPatternQtd,
                        this.itemsAr.finalPatternAcc
                    ],
                    type: 'bar',
                    types: {
                        '% Acumulado': 'spline'
                    },
                    axes: {
                        '% Acumulado': 'y2'
                    }
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            rotate: 90,
                            multiline: false
                        }
                    },
                    y2: {
                        show: true,
                        min: 10,
                        max: 100
                    }
                },
                grid: {
                    y: {
                        lines: [
                            {
                                value: 80,
                                text: '80% das Ocorrências',
                                // @ts-ignore
                                axis: 'y2'
                            }
                        ]
                    }
                }
            });
        }, 50);
    }
}
ParetoIncludeComponent.ɵfac = function ParetoIncludeComponent_Factory(t) { return new (t || ParetoIncludeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoDialogService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoNotificationService"])); };
ParetoIncludeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ParetoIncludeComponent, selectors: [["app-pareto-include"]], viewQuery: function ParetoIncludeComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoTableComponent"], true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoModalComponent"], true);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.poTable = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.poModal = _t.first);
    } }, decls: 14, vars: 5, consts: [[1, "row"], [1, "po-md-10"], ["p-label", "Descri\u00E7\u00E3o", "p-placeholder", "O que foi medido?", 3, "ngModel", "ngModelChange"], [1, "po-md-2"], ["p-label", "Quantidade", "p-placeholder", "Quantas vezes ocorreu?", 3, "ngModel", "ngModelChange"], [1, "po-md-12"], ["p-icon", "po-icon-plus", "p-label", "Adicionar", "p-type", "string", 1, "po-mr-1", 3, "p-click"], ["p-icon", "po-icon-delete", "p-label", "Remover", "p-type", "string", 1, "po-mr-1", 3, "p-click"], [1, "po-md-12", 3, "onResize"], ["id", "chart"], ["p-sort", "true", "p-hide-columns-manager", "true", "p-selectable", "", 3, "p-columns", "p-items", "p-striped"]], template: function ParetoIncludeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "po-container");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "po-input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ParetoIncludeComponent_Template_po_input_ngModelChange_3_listener($event) { return ctx.description = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "po-number", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ParetoIncludeComponent_Template_po_number_ngModelChange_5_listener($event) { return ctx.quantity = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "po-button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("p-click", function ParetoIncludeComponent_Template_po_button_p_click_7_listener() { return ctx.addOperation(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "po-button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("p-click", function ParetoIncludeComponent_Template_po_button_p_click_8_listener() { return ctx.deleteOperation(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "po-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onResize", function ParetoIncludeComponent_Template_div_onResize_10_listener() { return ctx.generateChart(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "po-table", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.description);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.quantity);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("p-columns", ctx.columns)("p-items", ctx.items)("p-striped", true);
    } }, directives: [_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoContainerComponent"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoInputComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgModel"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoNumberComponent"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoButtonComponent"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoDividerComponent"], ngx_resize_observer__WEBPACK_IMPORTED_MODULE_5__["NgxResizeObserverDirective"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoTableComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJpbmNsdWRlLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ParetoIncludeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-pareto-include',
                templateUrl: './include.component.html',
                styleUrls: ['./include.component.css']
            }]
    }], function () { return [{ type: _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoDialogService"] }, { type: _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoNotificationService"] }]; }, { poTable: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: [_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoTableComponent"], { static: true }]
        }], poModal: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: [_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoModalComponent"], { static: true }]
        }] }); })();


/***/ }),

/***/ 1:
/*!**********************!*\
  !*** zlib (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "1lya":
/*!**********************************************************!*\
  !*** ./src/app/application/process/oee/oee.component.ts ***!
  \**********************************************************/
/*! exports provided: OeeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OeeComponent", function() { return OeeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @po-ui/ng-components */ "wBT/");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");




class OeeComponent {
    constructor() {
        this.actions = [
            { label: 'Ajuda', url: 'https://exoconsultoria.com.br/estudo-de-caso-01-gbo/', icon: 'po-icon-help' }
        ];
    }
    ngOnInit() {
    }
    changeRouter() {
        console.table(this.attendances);
    }
}
OeeComponent.ɵfac = function OeeComponent_Factory(t) { return new (t || OeeComponent)(); };
OeeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: OeeComponent, selectors: [["app-oee"]], decls: 2, vars: 1, consts: [["p-title", "OEE / TEEP - Efici\u00EAncia", 3, "p-actions"]], template: function OeeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "po-page-default", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("p-actions", ctx.actions);
    } }, directives: [_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoPageDefaultComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJvZWUuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](OeeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-oee',
                templateUrl: './oee.component.html',
                styleUrls: ['./oee.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ 2:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!**********************!*\
  !*** http (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/*!***********************!*\
  !*** https (ignored) ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "4RW0":
/*!*************************************************************************************!*\
  !*** ./src/app/application/helpcenter/helpcenter-home/helpcenter-home.component.ts ***!
  \*************************************************************************************/
/*! exports provided: HelpcenterHomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HelpcenterHomeComponent", function() { return HelpcenterHomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @po-ui/ng-components */ "wBT/");



class HelpcenterHomeComponent {
    constructor() { }
    ngOnInit() {
    }
}
HelpcenterHomeComponent.ɵfac = function HelpcenterHomeComponent_Factory(t) { return new (t || HelpcenterHomeComponent)(); };
HelpcenterHomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HelpcenterHomeComponent, selectors: [["app-helpcenter-home"]], decls: 3, vars: 0, consts: [["p-title", "Cadeia de Ajuda"]], template: function HelpcenterHomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "po-page-default", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Cadeia de Ajuda");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoPageDefaultComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJoZWxwY2VudGVyLWhvbWUuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HelpcenterHomeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-helpcenter-home',
                templateUrl: './helpcenter-home.component.html',
                styleUrls: ['./helpcenter-home.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ 5:
/*!*********************!*\
  !*** url (ignored) ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "8W7V":
/*!******************************************************!*\
  !*** ./src/app/application/ppcpm/ppcpm.component.ts ***!
  \******************************************************/
/*! exports provided: PpcpmComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PpcpmComponent", function() { return PpcpmComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");



class PpcpmComponent {
    constructor() {
        this.actions = [
            { label: 'Ajuda', url: 'https://exoconsultoria.com.br/estudo-de-caso-01-gbo/', icon: 'po-icon-help' }
        ];
    }
    ngOnInit() {
    }
}
PpcpmComponent.ɵfac = function PpcpmComponent_Factory(t) { return new (t || PpcpmComponent)(); };
PpcpmComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PpcpmComponent, selectors: [["app-ppcpm"]], decls: 1, vars: 0, template: function PpcpmComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcGNwbS5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PpcpmComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-ppcpm',
                templateUrl: './ppcpm.component.html',
                styleUrls: ['./ppcpm.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Gu+A":
/*!**********************************************************!*\
  !*** ./src/app/application/process/gbo/gbo.component.ts ***!
  \**********************************************************/
/*! exports provided: GboComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GboComponent", function() { return GboComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @po-ui/ng-components */ "wBT/");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");




class GboComponent {
    constructor() {
        this.actions = [
            { label: 'Ajuda', url: 'https://exoconsultoria.com.br/estudo-de-caso-01-gbo/', icon: 'po-icon-help' }
        ];
    }
    ngOnInit() {
    }
}
GboComponent.ɵfac = function GboComponent_Factory(t) { return new (t || GboComponent)(); };
GboComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GboComponent, selectors: [["app-gbo"]], decls: 2, vars: 1, consts: [["p-title", "Gr\u00E1fico de Balanceamento de Operadores", 3, "p-actions"]], template: function GboComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "po-page-default", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("p-actions", ctx.actions);
    } }, directives: [_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoPageDefaultComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJnYm8uY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GboComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-gbo',
                templateUrl: './gbo.component.html',
                styleUrls: ['./gbo.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "N3uM":
/*!**********************************************************************!*\
  !*** ./src/app/application/process/gbo/include/include.component.ts ***!
  \**********************************************************************/
/*! exports provided: GboIncludeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GboIncludeComponent", function() { return GboIncludeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @po-ui/ng-components */ "wBT/");
/* harmony import */ var c3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! c3 */ "LV99");
/* harmony import */ var c3__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(c3__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "LvDl");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var ngx_resize_observer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-resize-observer */ "16Lg");








class GboIncludeComponent {
    constructor(poDialog, poNotification) {
        this.poDialog = poDialog;
        this.poNotification = poNotification;
        this.columns = [
            { property: 'takt', type: 'number', label: 'Takt' },
            { property: 'cycle', type: 'number', label: 'Ciclo' },
            { property: 'workCenter', label: 'Centro Trabalho' },
            { property: 'description', label: 'Descrição Atividade' },
            { property: 'lowRepCycle', label: 'Tempo' }
        ];
        this.items = [
            {
                takt: 50,
                workCenter: 'Pré-Montagem',
                description: 'Operação 1',
                cycle: 40,
                lowRepCycle: 28
            },
            {
                takt: 50,
                cycle: 40,
                workCenter: 'Pré-Montagem',
                description: 'Operação 2',
                lowRepCycle: 28
            },
            {
                takt: 50,
                cycle: 40,
                workCenter: 'Montagem',
                description: 'Operação Final',
                lowRepCycle: 36
            }
        ];
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.generateChart();
    }
    addOperation() {
        const item = {
            takt: this.takt,
            cycle: this.calculateCycleTime(this.takt),
            workCenter: this.workCenter,
            description: this.description,
            lowRepCycle: this.lowRepCycle
        };
        if (this.takt && this.workCenter && this.description && this.lowRepCycle != null) {
            this.items.push(item);
            this.takt = undefined;
            this.workCenter = undefined;
            this.description = undefined;
            this.lowRepCycle = undefined;
        }
        else {
            const poNotification = {
                message: 'Campos inválidos, favor verificar as informações',
                duration: 3000
            };
            this.poNotification.warning(poNotification);
        }
        this.generateChart();
    }
    calculateCycleTime(takt) {
        return (takt * 0.8);
    }
    deleteOperation() {
        const selectedItems = this.poTable.getSelectedRows();
        if (selectedItems.length > 0) {
            this.poDialog.confirm({
                title: 'Remover itens',
                literals: { cancel: 'Cancelar', confirm: 'Sim' },
                message: `Você gostaria de remover esses ${selectedItems.length} itens da lista?`,
                confirm: () => {
                    this.removeSelectedItems(selectedItems);
                },
                cancel: () => { }
            });
        }
    }
    generateChartData(data) {
        this.chartData = this.obcCalc(data);
    }
    generateChart() {
        this.chart();
        this.generateChartData(this.items);
    }
    removeSelectedItems(selectedItems) {
        this.items = this.items.filter(item => !selectedItems.includes(item));
        this.generateChart();
    }
    obcCalc(obc) {
        const firstCol = [
            ['x']
        ];
        const secondCol = [
            ['# Processo']
        ];
        const thirdCol = [
            ['Takt']
        ];
        const fourthCol = [
            ['Ciclo']
        ];
        const workCenterUniqArray = lodash__WEBPACK_IMPORTED_MODULE_3__["uniq"](obc.map(proc => proc.workCenter));
        const finalFirstCol = lodash__WEBPACK_IMPORTED_MODULE_3__["flattenDeep"](firstCol.concat(workCenterUniqArray));
        const groups = [];
        for (const row of workCenterUniqArray) {
            const processByBox = obc
                .filter(proc => proc.workCenter === row)
                .map(proc => proc.lowRepCycle)
                .reduce((acc, curr) => acc + curr);
            groups.push(processByBox);
        }
        const finalSecondCol = lodash__WEBPACK_IMPORTED_MODULE_3__["flattenDeep"](secondCol.concat(groups));
        const almostFinalThirdCol = [];
        const almostFinalFourthCol = [];
        for (const row of workCenterUniqArray) {
            const processByBox = obc
                .filter(proc => proc.workCenter === row)
                .map(proc => proc.takt);
            almostFinalThirdCol.push(lodash__WEBPACK_IMPORTED_MODULE_3__["uniq"](processByBox));
        }
        const finalThirdCol = thirdCol.concat(lodash__WEBPACK_IMPORTED_MODULE_3__["flattenDeep"](almostFinalThirdCol));
        for (const row of workCenterUniqArray) {
            const processByBox = obc
                .filter(proc => proc.workCenter === row)
                .map(proc => proc.cycle);
            almostFinalFourthCol.push(lodash__WEBPACK_IMPORTED_MODULE_3__["uniq"](processByBox));
        }
        const finalFourthCol = fourthCol.concat(lodash__WEBPACK_IMPORTED_MODULE_3__["flattenDeep"](almostFinalFourthCol));
        return {
            finalFirstCol,
            finalSecondCol,
            finalThirdCol,
            finalFourthCol
        };
    }
    chart() {
        setTimeout(() => {
            c3__WEBPACK_IMPORTED_MODULE_2__["generate"]({
                bindto: '#chart',
                data: {
                    x: 'x',
                    columns: [
                        this.chartData.finalFirstCol,
                        this.chartData.finalSecondCol,
                        this.chartData.finalThirdCol,
                        this.chartData.finalFourthCol,
                    ],
                    type: 'bar',
                    types: {
                        Takt: 'line',
                        Ciclo: 'line'
                    },
                    axes: {
                        takt: 'y2'
                    }
                },
                legend: {
                    position: 'inset'
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            rotate: 75,
                            multiline: false
                        }
                    }
                }
            });
        }, 50);
    }
}
GboIncludeComponent.ɵfac = function GboIncludeComponent_Factory(t) { return new (t || GboIncludeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoDialogService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoNotificationService"])); };
GboIncludeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GboIncludeComponent, selectors: [["app-gbo-include"]], viewQuery: function GboIncludeComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoTableComponent"], true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoModalComponent"], true);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.poTable = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.poModal = _t.first);
    } }, decls: 18, vars: 7, consts: [[1, "row"], [1, "po-md-12", "po-lg-2"], ["p-label", "Takt Time", "p-placeholder", "Valor em minutos", "p-name", "takt", 3, "ngModel", "ngModelChange"], [1, "po-md-12", "po-lg-3"], ["p-label", "Centro de Trabalho", "p-placeholder", "Nome do Centro de Trabalho", 3, "ngModel", "ngModelChange"], [1, "po-md-12", "po-lg-5"], ["p-label", "Descri\u00E7\u00E3o da Atividade", "p-placeholder", "O que est\u00E1 sendo realizado?", 3, "ngModel", "ngModelChange"], ["p-label", "Tempo de Opera\u00E7\u00E3o", "p-placeholder", "Valor em minutos", 3, "ngModel", "ngModelChange"], [1, "po-md-12"], ["p-icon", "po-icon-plus", "p-label", "Adicionar", "p-type", "string", 1, "po-mr-1", 3, "p-click"], ["p-icon", "po-icon-delete", "p-label", "Remover", "p-type", "string", 1, "po-mr-1", 3, "p-click"], [1, "po-md-12", 3, "onResize"], ["id", "chart"], ["p-sort", "true", "p-hide-columns-manager", "true", "p-selectable", "", 3, "p-columns", "p-items", "p-striped"]], template: function GboIncludeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "po-container");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "po-number", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function GboIncludeComponent_Template_po_number_ngModelChange_3_listener($event) { return ctx.takt = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "po-input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function GboIncludeComponent_Template_po_input_ngModelChange_5_listener($event) { return ctx.workCenter = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "po-input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function GboIncludeComponent_Template_po_input_ngModelChange_7_listener($event) { return ctx.description = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "po-number", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function GboIncludeComponent_Template_po_number_ngModelChange_9_listener($event) { return ctx.lowRepCycle = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "po-button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("p-click", function GboIncludeComponent_Template_po_button_p_click_11_listener() { return ctx.addOperation(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "po-button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("p-click", function GboIncludeComponent_Template_po_button_p_click_12_listener() { return ctx.deleteOperation(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "po-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onResize", function GboIncludeComponent_Template_div_onResize_14_listener() { return ctx.generateChart(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "po-table", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.takt);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.workCenter);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.description);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.lowRepCycle);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("p-columns", ctx.columns)("p-items", ctx.items)("p-striped", true);
    } }, directives: [_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoContainerComponent"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoNumberComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgModel"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoInputComponent"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoButtonComponent"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoDividerComponent"], ngx_resize_observer__WEBPACK_IMPORTED_MODULE_5__["NgxResizeObserverDirective"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoTableComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJpbmNsdWRlLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GboIncludeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-gbo-include',
                templateUrl: './include.component.html',
                styleUrls: ['./include.component.css']
            }]
    }], function () { return [{ type: _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoDialogService"] }, { type: _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoNotificationService"] }]; }, { poTable: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: [_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoTableComponent"], { static: true }]
        }], poModal: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: [_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoModalComponent"], { static: true }]
        }] }); })();


/***/ }),

/***/ "O4oB":
/*!**********************************************************!*\
  !*** ./src/app/application/process/process.component.ts ***!
  \**********************************************************/
/*! exports provided: ProcessComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProcessComponent", function() { return ProcessComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");



class ProcessComponent {
    constructor() { }
    ngOnInit() {
    }
}
ProcessComponent.ɵfac = function ProcessComponent_Factory(t) { return new (t || ProcessComponent)(); };
ProcessComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProcessComponent, selectors: [["app-process"]], decls: 1, vars: 0, template: function ProcessComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9jZXNzLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProcessComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-process',
                templateUrl: './process.component.html',
                styleUrls: ['./process.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "PZI7":
/*!**************************************************************************************!*\
  !*** ./src/app/application/ppcpm/project/project-viewer/project-viewer.component.ts ***!
  \**************************************************************************************/
/*! exports provided: ProjectViewerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectViewerComponent", function() { return ProjectViewerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @po-ui/ng-components */ "wBT/");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var ng2_pdf_viewer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng2-pdf-viewer */ "IkSl");





class ProjectViewerComponent {
    constructor() {
        this.apiUrl = 'http://192.168.5.221:8080/';
    }
    ngOnInit() {
    }
    searchDocument() {
        this.pdfCode = `${this.apiUrl}` + `${this.code}` + '.pdf';
    }
}
ProjectViewerComponent.ɵfac = function ProjectViewerComponent_Factory(t) { return new (t || ProjectViewerComponent)(); };
ProjectViewerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProjectViewerComponent, selectors: [["app-viewer"]], decls: 8, vars: 5, consts: [[1, "row"], [1, "po-md-12"], ["p-label", "C\u00F3digo", "p-help", "C\u00F3digo do Documento", 3, "ngModel", "ngModelChange", "keyup.enter"], ["p-label", "Procurar", "p-icon", "po-icon-export", 3, "p-click"], [1, "po-md-12", "po-lg-12"], [3, "src", "original-size", "fit-to-page", "show-borders"]], template: function ProjectViewerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "po-container");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "po-input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ProjectViewerComponent_Template_po_input_ngModelChange_3_listener($event) { return ctx.code = $event; })("keyup.enter", function ProjectViewerComponent_Template_po_input_keyup_enter_3_listener() { return ctx.searchDocument(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "po-button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("p-click", function ProjectViewerComponent_Template_po_button_p_click_5_listener() { return ctx.searchDocument(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "pdf-viewer", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.code);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.pdfCode)("original-size", true)("fit-to-page", true)("show-borders", true);
    } }, directives: [_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoContainerComponent"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoInputComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoButtonComponent"], ng2_pdf_viewer__WEBPACK_IMPORTED_MODULE_3__["PdfViewerComponent"]], styles: [".pdf-viewer[_ngcontent-%COMP%] {\r\n    display: block;\r\n    height: 100vh;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3Qtdmlld2VyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxjQUFjO0lBQ2QsYUFBYTtBQUNqQiIsImZpbGUiOiJwcm9qZWN0LXZpZXdlci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnBkZi12aWV3ZXIge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBoZWlnaHQ6IDEwMHZoO1xyXG59XHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProjectViewerComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-viewer',
                templateUrl: './project-viewer.component.html',
                styleUrls: ['./project-viewer.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");



class AppComponent {
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "VOxf":
/*!***********************************************************************!*\
  !*** ./src/app/application/process/smed/include/include.component.ts ***!
  \***********************************************************************/
/*! exports provided: SmedIncludeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SmedIncludeComponent", function() { return SmedIncludeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @po-ui/ng-components */ "wBT/");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");





const _c0 = function () { return { label: "Interno", value: "01" }; };
const _c1 = function () { return { label: "Externo", value: "02" }; };
const _c2 = function (a0, a1) { return [a0, a1]; };
const _c3 = function () { return { label: "Sim", value: "01" }; };
const _c4 = function () { return { label: "N\u00E3o", value: "02" }; };
class SmedIncludeComponent {
    constructor(poDialog, poNotification) {
        this.poDialog = poDialog;
        this.poNotification = poNotification;
        this.totalSetupTime = 0;
        this.smedPercentuaGain = 0;
        this.smedTimeGain = 0;
        this.columns = [
            {
                property: 'operationDescription',
                type: 'string',
                label: 'Operação'
            },
            {
                property: 'time',
                type: 'number',
                label: 'Tempo'
            },
            {
                property: 'setupType',
                type: 'label',
                label: 'Tipo Setup',
                labels: [
                    { value: '01', color: 'color-07', label: 'Interno' },
                    { value: '02', color: 'color-11', label: 'Externo' }
                ]
            },
            {
                property: 'canBeExternal',
                type: 'label',
                label: 'É ou Pode ser Externalizado?',
                labels: [
                    { value: '01', color: 'color-11', label: 'Sim' },
                    { value: '02', color: 'color-07', label: 'Não' }
                ]
            }
        ];
        this.items = [
            {
                operationDescription: 'Buscar ferramentas na caixa',
                time: 12,
                setupType: '02',
                canBeExternal: '02'
            },
            {
                operationDescription: 'Soltar componente x',
                time: 15,
                setupType: '01',
                canBeExternal: '02'
            },
            {
                operationDescription: 'Limpar ferramentas',
                time: 20,
                setupType: '01',
                canBeExternal: '01'
            }
        ];
    }
    ngOnInit() {
        this.calculateSmedGain();
    }
    addItems() {
        const item = {
            operationDescription: this.operationDescription,
            time: this.time,
            setupType: this.setupType,
            canBeExternal: this.canBeExternal
        };
        if (this.operationDescription && this.time && this.setupType && this.canBeExternal !== null) {
            this.items.push(item);
            this.calculateSmedGain();
        }
        else {
            const poNotification = {
                message: 'Campos inválidos, favor verificar as informações',
                duration: 3000
            };
            this.poNotification.warning(poNotification);
        }
    }
    deleteItens() {
        const selectedItems = this.poTable.getSelectedRows();
        if (selectedItems.length > 0) {
            this.poDialog.confirm({
                title: 'Remover itens',
                literals: { cancel: 'Cancelar', confirm: 'Sim' },
                message: `Você gostaria de remover esses ${selectedItems.length} itens da lista?`,
                confirm: () => {
                    this.removeSelectedItems(selectedItems);
                    this.calculateSmedGain();
                },
                cancel: () => { }
            });
        }
    }
    calculateSmedGain() {
        const totalSetup = this.items.reduce((sum, operationTime) => {
            return sum + operationTime.time;
        }, 0);
        const totalCanBeExternalSetup = this.items.filter(item => {
            return item.setupType === '01' && item.canBeExternal === '01';
        }).reduce((sum, operationTime) => {
            return sum + operationTime.time;
        }, 0);
        this.smedTimeGain = totalCanBeExternalSetup;
        const tempSmedPercentualGain = totalCanBeExternalSetup / totalSetup;
        this.smedPercentuaGain = Math.round((tempSmedPercentualGain + Number.EPSILON) * 100);
        this.totalSetupTime = totalSetup;
    }
    removeSelectedItems(selectedItems) {
        this.items = this.items.filter(item => !selectedItems.includes(item));
    }
}
SmedIncludeComponent.ɵfac = function SmedIncludeComponent_Factory(t) { return new (t || SmedIncludeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoDialogService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoNotificationService"])); };
SmedIncludeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SmedIncludeComponent, selectors: [["app-smed-include"]], viewQuery: function SmedIncludeComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoTableComponent"], true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoModalComponent"], true);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.poTable = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.poModal = _t.first);
    } }, decls: 27, vars: 22, consts: [[1, "row"], ["p-label", "Descri\u00E7\u00E3o", "p-placeholder", "O que est\u00E1 sendo feito?", 1, "po-md-6", 3, "ngModel", "ngModelChange"], ["p-label", "Tempo da Opera\u00E7\u00E3o", "p-placeholder", "Quanto tempo?", "p-name", "Tempo Total", 1, "po-md-2", 3, "ngModel", "ngModelChange"], ["name", "setupType", "p-label", "Tipo de Setup", 1, "po-md-2", 3, "ngModel", "p-options", "ngModelChange"], ["name", "setupExternal", "p-label", "\u00C9 ou Pode ser Externo?", 1, "po-md-2", 3, "ngModel", "p-options", "ngModelChange"], [1, "po-md-12"], ["p-icon", "po-icon-plus", "p-label", "Adicionar", "p-type", "string", 1, "po-mr-1", 3, "p-click"], ["p-icon", "po-icon-delete", "p-label", "Remover", "p-type", "string", 1, "po-mr-1", 3, "p-click"], [1, "po-md-3", "po-mt-1"], ["p-title", "Tempo Total Setup", "p-primary", "true"], [1, "po-font-title", "po-text-center"], ["p-title", "Ganho em %"], ["p-title", "Ganho em Tempo"], ["id", "po-table-smed", "p-sort", "true", "p-hide-columns-manager", "true", "p-selectable", "", 3, "p-columns", "p-items", "p-striped"]], template: function SmedIncludeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "po-container");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "po-input", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function SmedIncludeComponent_Template_po_input_ngModelChange_3_listener($event) { return ctx.operationDescription = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "po-number", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function SmedIncludeComponent_Template_po_number_ngModelChange_4_listener($event) { return ctx.time = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "po-select", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function SmedIncludeComponent_Template_po_select_ngModelChange_6_listener($event) { return ctx.setupType = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "po-select", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function SmedIncludeComponent_Template_po_select_ngModelChange_7_listener($event) { return ctx.canBeExternal = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "po-button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("p-click", function SmedIncludeComponent_Template_po_button_p_click_9_listener() { return ctx.addItems(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "po-button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("p-click", function SmedIncludeComponent_Template_po_button_p_click_10_listener() { return ctx.deleteItens(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "po-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "po-widget", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "po-widget", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "po-widget", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "po-table", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.operationDescription);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.time);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.setupType)("p-options", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](14, _c2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](12, _c0), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](13, _c1)));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.canBeExternal)("p-options", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](19, _c2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](17, _c3), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](18, _c4)));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.totalSetupTime);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx.smedPercentuaGain, " %");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.smedTimeGain);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("p-columns", ctx.columns)("p-items", ctx.items)("p-striped", true);
    } }, directives: [_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoContainerComponent"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoInputComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoNumberComponent"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoSelectComponent"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoButtonComponent"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoDividerComponent"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoWidgetComponent"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoTableComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJpbmNsdWRlLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SmedIncludeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-smed-include',
                templateUrl: './include.component.html',
                styleUrls: ['./include.component.css']
            }]
    }], function () { return [{ type: _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoDialogService"] }, { type: _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoNotificationService"] }]; }, { poTable: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: [_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoTableComponent"], { static: true }]
        }], poModal: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: [_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoModalComponent"], { static: true }]
        }] }); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @po-ui/ng-components */ "wBT/");
/* harmony import */ var _po_ui_ng_templates__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @po-ui/ng-templates */ "nkLZ");
/* harmony import */ var ngx_resize_observer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-resize-observer */ "16Lg");
/* harmony import */ var ng2_pdf_viewer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng2-pdf-viewer */ "IkSl");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./login/login.component */ "vtpD");
/* harmony import */ var _application_application_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./application/application.component */ "j4it");
/* harmony import */ var _application_application_home_application_home_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./application/application-home/application-home.component */ "q0oV");
/* harmony import */ var _application_process_process_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./application/process/process.component */ "O4oB");
/* harmony import */ var _application_process_gbo_gbo_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./application/process/gbo/gbo.component */ "Gu+A");
/* harmony import */ var _application_process_gbo_include_include_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./application/process/gbo/include/include.component */ "N3uM");
/* harmony import */ var _application_process_oee_oee_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./application/process/oee/oee.component */ "1lya");
/* harmony import */ var _application_process_oee_include_include_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./application/process/oee/include/include.component */ "vYRQ");
/* harmony import */ var _application_process_smed_smed_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./application/process/smed/smed.component */ "ry9T");
/* harmony import */ var _application_process_smed_include_include_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./application/process/smed/include/include.component */ "VOxf");
/* harmony import */ var _application_ppcpm_ppcpm_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./application/ppcpm/ppcpm.component */ "8W7V");
/* harmony import */ var _application_ppcpm_project_project_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./application/ppcpm/project/project.component */ "lNWS");
/* harmony import */ var _application_ppcpm_project_project_viewer_project_viewer_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./application/ppcpm/project/project-viewer/project-viewer.component */ "PZI7");
/* harmony import */ var _application_ppcpm_po_po_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./application/ppcpm/po/po.component */ "qa8L");
/* harmony import */ var _application_ppcpm_po_po_viewer_po_viewer_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./application/ppcpm/po/po-viewer/po-viewer.component */ "lHnl");
/* harmony import */ var _application_quality_quality_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./application/quality/quality.component */ "zljb");
/* harmony import */ var _application_quality_pareto_pareto_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./application/quality/pareto/pareto.component */ "aGYT");
/* harmony import */ var _application_quality_pareto_include_include_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./application/quality/pareto/include/include.component */ "0H1/");
/* harmony import */ var _application_helpcenter_helpcenter_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./application/helpcenter/helpcenter.component */ "dnrJ");
/* harmony import */ var _application_helpcenter_helpcenter_home_helpcenter_home_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./application/helpcenter/helpcenter-home/helpcenter-home.component */ "4RW0");


































class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_10__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forRoot([], { relativeLinkResolution: 'legacy' }),
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
            _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_6__["PoModule"],
            _po_ui_ng_templates__WEBPACK_IMPORTED_MODULE_7__["PoTemplatesModule"],
            _po_ui_ng_templates__WEBPACK_IMPORTED_MODULE_7__["PoPageLoginModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            ng2_pdf_viewer__WEBPACK_IMPORTED_MODULE_9__["PdfViewerModule"],
            ngx_resize_observer__WEBPACK_IMPORTED_MODULE_8__["NgxResizeObserverModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_10__["AppComponent"],
        _login_login_component__WEBPACK_IMPORTED_MODULE_11__["LoginComponent"],
        _application_application_component__WEBPACK_IMPORTED_MODULE_12__["ApplicationComponent"],
        _application_process_process_component__WEBPACK_IMPORTED_MODULE_14__["ProcessComponent"],
        _application_process_gbo_gbo_component__WEBPACK_IMPORTED_MODULE_15__["GboComponent"],
        _application_process_gbo_include_include_component__WEBPACK_IMPORTED_MODULE_16__["GboIncludeComponent"],
        _application_ppcpm_ppcpm_component__WEBPACK_IMPORTED_MODULE_21__["PpcpmComponent"],
        _application_ppcpm_project_project_component__WEBPACK_IMPORTED_MODULE_22__["ProjectComponent"],
        _application_ppcpm_project_project_viewer_project_viewer_component__WEBPACK_IMPORTED_MODULE_23__["ProjectViewerComponent"],
        _application_application_home_application_home_component__WEBPACK_IMPORTED_MODULE_13__["ApplicationHomeComponent"],
        _application_helpcenter_helpcenter_component__WEBPACK_IMPORTED_MODULE_29__["HelpcenterComponent"],
        _application_helpcenter_helpcenter_home_helpcenter_home_component__WEBPACK_IMPORTED_MODULE_30__["HelpcenterHomeComponent"],
        _application_ppcpm_po_po_component__WEBPACK_IMPORTED_MODULE_24__["PoComponent"],
        _application_ppcpm_po_po_viewer_po_viewer_component__WEBPACK_IMPORTED_MODULE_25__["PoViewerComponent"],
        _application_process_oee_oee_component__WEBPACK_IMPORTED_MODULE_17__["OeeComponent"],
        _application_process_oee_include_include_component__WEBPACK_IMPORTED_MODULE_18__["OeeIncludeComponent"],
        _application_process_smed_smed_component__WEBPACK_IMPORTED_MODULE_19__["SmedComponent"],
        _application_process_smed_include_include_component__WEBPACK_IMPORTED_MODULE_20__["SmedIncludeComponent"],
        _application_quality_quality_component__WEBPACK_IMPORTED_MODULE_26__["QualityComponent"],
        _application_quality_pareto_pareto_component__WEBPACK_IMPORTED_MODULE_27__["ParetoComponent"],
        _application_quality_pareto_include_include_component__WEBPACK_IMPORTED_MODULE_28__["ParetoIncludeComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
        _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_6__["PoModule"],
        _po_ui_ng_templates__WEBPACK_IMPORTED_MODULE_7__["PoTemplatesModule"],
        _po_ui_ng_templates__WEBPACK_IMPORTED_MODULE_7__["PoPageLoginModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
        ng2_pdf_viewer__WEBPACK_IMPORTED_MODULE_9__["PdfViewerModule"],
        ngx_resize_observer__WEBPACK_IMPORTED_MODULE_8__["NgxResizeObserverModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_10__["AppComponent"],
                    _login_login_component__WEBPACK_IMPORTED_MODULE_11__["LoginComponent"],
                    _application_application_component__WEBPACK_IMPORTED_MODULE_12__["ApplicationComponent"],
                    _application_process_process_component__WEBPACK_IMPORTED_MODULE_14__["ProcessComponent"],
                    _application_process_gbo_gbo_component__WEBPACK_IMPORTED_MODULE_15__["GboComponent"],
                    _application_process_gbo_include_include_component__WEBPACK_IMPORTED_MODULE_16__["GboIncludeComponent"],
                    _application_ppcpm_ppcpm_component__WEBPACK_IMPORTED_MODULE_21__["PpcpmComponent"],
                    _application_ppcpm_project_project_component__WEBPACK_IMPORTED_MODULE_22__["ProjectComponent"],
                    _application_ppcpm_project_project_viewer_project_viewer_component__WEBPACK_IMPORTED_MODULE_23__["ProjectViewerComponent"],
                    _application_application_home_application_home_component__WEBPACK_IMPORTED_MODULE_13__["ApplicationHomeComponent"],
                    _application_helpcenter_helpcenter_component__WEBPACK_IMPORTED_MODULE_29__["HelpcenterComponent"],
                    _application_helpcenter_helpcenter_home_helpcenter_home_component__WEBPACK_IMPORTED_MODULE_30__["HelpcenterHomeComponent"],
                    _application_ppcpm_po_po_component__WEBPACK_IMPORTED_MODULE_24__["PoComponent"],
                    _application_ppcpm_po_po_viewer_po_viewer_component__WEBPACK_IMPORTED_MODULE_25__["PoViewerComponent"],
                    _application_process_oee_oee_component__WEBPACK_IMPORTED_MODULE_17__["OeeComponent"],
                    _application_process_oee_include_include_component__WEBPACK_IMPORTED_MODULE_18__["OeeIncludeComponent"],
                    _application_process_smed_smed_component__WEBPACK_IMPORTED_MODULE_19__["SmedComponent"],
                    _application_process_smed_include_include_component__WEBPACK_IMPORTED_MODULE_20__["SmedIncludeComponent"],
                    _application_quality_quality_component__WEBPACK_IMPORTED_MODULE_26__["QualityComponent"],
                    _application_quality_pareto_pareto_component__WEBPACK_IMPORTED_MODULE_27__["ParetoComponent"],
                    _application_quality_pareto_include_include_component__WEBPACK_IMPORTED_MODULE_28__["ParetoIncludeComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                    _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forRoot([], { relativeLinkResolution: 'legacy' }),
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
                    _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_6__["PoModule"],
                    _po_ui_ng_templates__WEBPACK_IMPORTED_MODULE_7__["PoTemplatesModule"],
                    _po_ui_ng_templates__WEBPACK_IMPORTED_MODULE_7__["PoPageLoginModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                    ng2_pdf_viewer__WEBPACK_IMPORTED_MODULE_9__["PdfViewerModule"],
                    ngx_resize_observer__WEBPACK_IMPORTED_MODULE_8__["NgxResizeObserverModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_10__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "aGYT":
/*!****************************************************************!*\
  !*** ./src/app/application/quality/pareto/pareto.component.ts ***!
  \****************************************************************/
/*! exports provided: ParetoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParetoComponent", function() { return ParetoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @po-ui/ng-components */ "wBT/");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");




class ParetoComponent {
    constructor() {
        this.actions = [
            { label: 'Ajuda', url: 'https://exoconsultoria.com.br/estudo-de-caso-01-gbo/', icon: 'po-icon-help' }
        ];
    }
    ngOnInit() {
    }
}
ParetoComponent.ɵfac = function ParetoComponent_Factory(t) { return new (t || ParetoComponent)(); };
ParetoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ParetoComponent, selectors: [["app-pareto"]], decls: 2, vars: 1, consts: [["p-title", "Gr\u00E1fico de Pareto", 3, "p-actions"]], template: function ParetoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "po-page-default", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("p-actions", ctx.actions);
    } }, directives: [_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoPageDefaultComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwYXJldG8uY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ParetoComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-pareto',
                templateUrl: './pareto.component.html',
                styleUrls: ['./pareto.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "dnrJ":
/*!****************************************************************!*\
  !*** ./src/app/application/helpcenter/helpcenter.component.ts ***!
  \****************************************************************/
/*! exports provided: HelpcenterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HelpcenterComponent", function() { return HelpcenterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");



class HelpcenterComponent {
    constructor() { }
    ngOnInit() {
    }
}
HelpcenterComponent.ɵfac = function HelpcenterComponent_Factory(t) { return new (t || HelpcenterComponent)(); };
HelpcenterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HelpcenterComponent, selectors: [["app-helpcenter"]], decls: 1, vars: 0, template: function HelpcenterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJoZWxwY2VudGVyLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HelpcenterComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-helpcenter',
                templateUrl: './helpcenter.component.html',
                styleUrls: ['./helpcenter.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "j4it":
/*!******************************************************!*\
  !*** ./src/app/application/application.component.ts ***!
  \******************************************************/
/*! exports provided: ApplicationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationComponent", function() { return ApplicationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @po-ui/ng-components */ "wBT/");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");




function ApplicationComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Lean App");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "small", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "por Matheus Sandrini Rossi");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class ApplicationComponent {
    constructor() {
        this.menus = [
            {
                label: 'Página Inicial',
                shortLabel: 'Início',
                icon: 'po-icon-home',
                link: '/app/home'
            },
            {
                label: 'Eng de Processos',
                icon: 'po-icon-settings',
                shortLabel: 'Eng. Proc.',
                subItems: [
                    {
                        label: 'Balanceamento de Operadores',
                        shortLabel: 'GBO',
                        link: '/app/process/gbo'
                    },
                    {
                        label: 'Troca Rápida Ferramenta',
                        shortLabel: 'TRF',
                        link: '/app/process/smed'
                    },
                    {
                        label: 'Gestão do Posto de Trabalho',
                        shortLabel: 'GPT'
                    },
                    {
                        label: 'OEE / TEEP - Eficiência',
                        shortLabel: 'OEE',
                        link: '/app/process/oee'
                    }
                ]
            },
            {
                label: 'PPCPM',
                icon: 'po-icon-manufacture',
                shortLabel: 'PPCPM',
                subItems: [
                    {
                        label: 'Ops',
                        link: '/app/ppcpm/po'
                    },
                    {
                        label: 'Projetos',
                        link: '/app/ppcpm/project'
                    }
                ]
            },
            {
                label: 'Qualidade',
                icon: 'po-icon-chart-area',
                shortLabel: 'Qual.',
                subItems: [
                    {
                        label: 'Pareto',
                        link: '/app/quality/pareto'
                    },
                    {
                        label: 'Correlação'
                    }
                ]
            },
            {
                label: 'Financeiro',
                icon: 'po-icon-money',
                shortLabel: 'Fin.',
                subItems: [
                    {
                        label: 'ROI'
                    }
                ]
            },
            {
                label: 'Cadeia de Ajuda',
                shortLabel: 'Ajuda',
                icon: 'po-icon-help',
                link: '/app/helpcenter/home'
            },
        ];
    }
    ngOnInit() {
    }
}
ApplicationComponent.ɵfac = function ApplicationComponent_Factory(t) { return new (t || ApplicationComponent)(); };
ApplicationComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ApplicationComponent, selectors: [["app-application"]], decls: 5, vars: 1, consts: [[1, "po-wrapper"], ["p-filter", "", "p-collapsed", "", 3, "p-menus"], ["class", "po-p-2 po-font-subtitle text-center", "style", "text-align: center;", 4, "p-menu-header-template"], ["p-title", "Lean App"], [1, "po-p-2", "po-font-subtitle", "text-center", 2, "text-align", "center"], [2, "font-size", "0.5em"]], template: function ApplicationComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "po-menu", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, ApplicationComponent_div_2_Template, 5, 0, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "po-toolbar", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("p-menus", ctx.menus);
    } }, directives: [_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoMenuComponent"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoMenuHeaderTemplateDirective"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoToolbarComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHBsaWNhdGlvbi5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ApplicationComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-application',
                templateUrl: './application.component.html',
                styleUrls: ['./application.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "lHnl":
/*!***********************************************************************!*\
  !*** ./src/app/application/ppcpm/po/po-viewer/po-viewer.component.ts ***!
  \***********************************************************************/
/*! exports provided: PoViewerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PoViewerComponent", function() { return PoViewerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @po-ui/ng-components */ "wBT/");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");




class PoViewerComponent {
    constructor() {
        this.columns = [
            {
                property: 'status',
                type: 'label',
                labels: [
                    { value: '01', color: 'color-11', label: 'No Prazo' },
                    { value: '02', color: 'color-08', label: 'Vencendo' },
                    { value: '03', color: 'color-07', label: 'Vencido' }
                ]
            },
            { property: 'po', type: 'string', label: 'OP' },
            { property: 'company', type: 'string', label: 'Filial' },
            { property: 'productCode', label: 'Cód. Produto' },
            { property: 'productDescription', label: 'Desc Produto.' },
            { property: 'orderQuantity', label: 'Qtd Solicitada' },
            { property: 'orderQuantityDelivered', label: 'Qtd Atendida' },
            { property: 'warehouse', label: 'Armazém' },
            { property: 'resource', label: 'Recurso' },
            { property: 'workCenter', label: 'Centro de Trabalho' }
        ];
        this.items = [
            {
                status: '01',
                po: '1234501001',
                company: '16',
                productCode: '3000088',
                productDescription: 'Caixa de Fueiro',
                orderQuantity: 10,
                orderQuantityDelivered: 8,
                warehouse: '04',
                resource: 'Guilhotina',
                workCenter: 'Fabricação Peças'
            },
            {
                status: '02',
                po: '1234501001',
                company: '16',
                productCode: '3000088',
                productDescription: 'Caixa de Fueiro',
                orderQuantity: 10,
                orderQuantityDelivered: 8,
                warehouse: '04',
                resource: 'Guilhotina',
                workCenter: 'Fabricação Peças'
            },
            {
                status: '03',
                po: '1234501001',
                company: '16',
                productCode: '3000088',
                productDescription: 'Caixa de Fueiro',
                orderQuantity: 10,
                orderQuantityDelivered: 8,
                warehouse: '04',
                resource: 'Guilhotina',
                workCenter: 'Fabricação Peças'
            }
        ];
    }
    ngOnInit() {
    }
}
PoViewerComponent.ɵfac = function PoViewerComponent_Factory(t) { return new (t || PoViewerComponent)(); };
PoViewerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PoViewerComponent, selectors: [["app-po-viewer"]], decls: 20, vars: 5, consts: [[1, "row"], [1, "po-xs-11", "po-sm-11", "po-md-11", "po-lg-2", "po-p-0"], ["p-label", "OP", "p-placeholder", "Ordem de Produ\u00E7\u00E3o", 3, "ngModel", "ngModelChange"], [1, "po-xs-1", "po-sm-1", "po-md-1", "po-lg-1", "po-p-0", 2, "margin-top", "2em"], ["p-icon", "po-icon-qr-code", "p-type", "string"], ["p-label", "Produto", "p-placeholder", "C\u00F3digo do Produto", 3, "ngModel", "ngModelChange"], ["p-label", "Recurso", "p-placeholder", "M\u00E1quina", 3, "ngModel", "ngModelChange"], [1, "po-md-12"], ["id", "chart"], ["p-sort", "true", "p-striped", "true", "p-selectable", "", 3, "p-columns", "p-items"]], template: function PoViewerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "po-container");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "po-input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function PoViewerComponent_Template_po_input_ngModelChange_3_listener($event) { return ctx.po = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "po-button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "po-input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function PoViewerComponent_Template_po_input_ngModelChange_7_listener($event) { return ctx.product = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "po-button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "po-input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function PoViewerComponent_Template_po_input_ngModelChange_11_listener($event) { return ctx.resource = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "po-button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "po-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "po-table", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.po);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.product);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.resource);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("p-columns", ctx.columns)("p-items", ctx.items);
    } }, directives: [_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoContainerComponent"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoInputComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoButtonComponent"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoDividerComponent"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoTableComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwby12aWV3ZXIuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PoViewerComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-po-viewer',
                templateUrl: './po-viewer.component.html',
                styleUrls: ['./po-viewer.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "lNWS":
/*!****************************************************************!*\
  !*** ./src/app/application/ppcpm/project/project.component.ts ***!
  \****************************************************************/
/*! exports provided: ProjectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectComponent", function() { return ProjectComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @po-ui/ng-components */ "wBT/");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");




class ProjectComponent {
    constructor() {
        this.actions = [
            { label: 'Ajuda', url: 'https://exoconsultoria.com.br/estudo-de-caso-01-gbo/', icon: 'po-icon-help' }
        ];
    }
    ngOnInit() {
    }
}
ProjectComponent.ɵfac = function ProjectComponent_Factory(t) { return new (t || ProjectComponent)(); };
ProjectComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProjectComponent, selectors: [["app-project"]], decls: 2, vars: 1, consts: [["p-title", "Projetos", 3, "p-actions"]], template: function ProjectComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "po-page-default", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("p-actions", ctx.actions);
    } }, directives: [_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoPageDefaultComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9qZWN0LmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProjectComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-project',
                templateUrl: './project.component.html',
                styleUrls: ['./project.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "q0oV":
/*!****************************************************************************!*\
  !*** ./src/app/application/application-home/application-home.component.ts ***!
  \****************************************************************************/
/*! exports provided: ApplicationHomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationHomeComponent", function() { return ApplicationHomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @po-ui/ng-components */ "wBT/");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");




function ApplicationHomeComponent_div_11_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "po-progress", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const subitem_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("p-info", subitem_r3.situation);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("p-status", subitem_r3.status);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("p-text", subitem_r3.text);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("p-value", subitem_r3.value);
} }
function ApplicationHomeComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "po-divider", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ApplicationHomeComponent_div_11_div_4_Template, 2, 4, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("p-label", item_r1.domain);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", item_r1.subDomain);
} }
class ApplicationHomeComponent {
    constructor() {
        this.actions = [
            { label: 'Ajuda', url: 'https://www.linkedin.com/in/matheus-sandrini-rossi/', icon: 'po-icon-help' }
        ];
        this.projectStatus = [
            {
                domain: 'Engenharia de Processos',
                subDomain: [
                    {
                        text: 'GBO',
                        situation: '100%',
                        status: 'success',
                        value: 100
                    },
                    {
                        text: 'TRF',
                        situation: '100%',
                        status: 'success',
                        value: 100
                    },
                    {
                        text: 'GPT',
                        situation: '0%',
                        status: 'info',
                        value: 0
                    },
                    {
                        text: 'OEE / TEEP',
                        situation: '100%',
                        status: 'success',
                        value: 100
                    }
                ]
            },
            {
                domain: 'PPCPM',
                subDomain: [
                    {
                        text: 'Visualização Projetos',
                        situation: '100%',
                        status: 'success',
                        value: 100
                    },
                    {
                        text: 'Centro de OPs',
                        situation: '20%',
                        status: 'info',
                        value: 20
                    },
                    {
                        text: 'Carga Máquina',
                        situation: '0%',
                        status: 'info',
                        value: 0
                    }
                ]
            },
            {
                domain: 'Qualidade',
                subDomain: [
                    {
                        text: 'Pareto',
                        situation: '100%',
                        status: 'success',
                        value: 100
                    },
                    {
                        text: 'Correlação',
                        situation: '0%',
                        status: 'info',
                        value: 0
                    },
                    {
                        text: '5w2hg',
                        situation: '0%',
                        status: 'info',
                        value: 0
                    }
                ]
            },
            {
                domain: 'Financeiro',
                subDomain: [
                    {
                        text: 'ROI',
                        situation: '0%',
                        status: 'info',
                        value: 0
                    }
                ]
            },
            {
                domain: 'Ajuda',
                subDomain: [
                    {
                        text: 'Cadeia de Ajuda',
                        situation: '0%',
                        status: 'info',
                        value: 0
                    }
                ]
            }
        ];
    }
    ngOnInit() {
    }
}
ApplicationHomeComponent.ɵfac = function ApplicationHomeComponent_Factory(t) { return new (t || ApplicationHomeComponent)(); };
ApplicationHomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ApplicationHomeComponent, selectors: [["app-application-home"]], decls: 12, vars: 2, consts: [["p-title", "Lean Manufacturing", 3, "p-actions"], [1, "row"], [1, "po-font-text", "po-md-12"], [1, "po-font-subtitle", "po-md-12"], ["class", "po-md-12", 4, "ngFor", "ngForOf"], [1, "po-md-12"], [3, "p-label"], ["class", "po-md-6", 4, "ngFor", "ngForOf"], [1, "po-md-6"], ["p-info-icon", "infoIcon", 3, "p-info", "p-status", "p-text", "p-value"]], template: function ApplicationHomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "po-page-default", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "po-container");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " Aplicativo em desenvolvimento. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, " Por Matheus Sandrini Rossi. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " RoadMap ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, ApplicationHomeComponent_div_11_Template, 5, 2, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("p-actions", ctx.actions);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.projectStatus);
    } }, directives: [_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoPageDefaultComponent"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoContainerComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoDividerComponent"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoProgressComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHBsaWNhdGlvbi1ob21lLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ApplicationHomeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-application-home',
                templateUrl: './application-home.component.html',
                styleUrls: ['./application-home.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "qa8L":
/*!******************************************************!*\
  !*** ./src/app/application/ppcpm/po/po.component.ts ***!
  \******************************************************/
/*! exports provided: PoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PoComponent", function() { return PoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @po-ui/ng-components */ "wBT/");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");




class PoComponent {
    constructor() {
        this.actions = [
            { label: 'Ajuda', url: 'https://exoconsultoria.com.br/estudo-de-caso-01-gbo/', icon: 'po-icon-help' }
        ];
    }
    ngOnInit() {
    }
}
PoComponent.ɵfac = function PoComponent_Factory(t) { return new (t || PoComponent)(); };
PoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PoComponent, selectors: [["app-po"]], decls: 2, vars: 1, consts: [["p-title", "Ordens de Produ\u00E7\u00E3o", 3, "p-actions"]], template: function PoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "po-page-default", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("p-actions", ctx.actions);
    } }, directives: [_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoPageDefaultComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwby5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PoComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-po',
                templateUrl: './po.component.html',
                styleUrls: ['./po.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "ry9T":
/*!************************************************************!*\
  !*** ./src/app/application/process/smed/smed.component.ts ***!
  \************************************************************/
/*! exports provided: SmedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SmedComponent", function() { return SmedComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @po-ui/ng-components */ "wBT/");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");




class SmedComponent {
    constructor() {
        this.actions = [
            { label: 'Ajuda', url: 'https://exoconsultoria.com.br/estudo-de-caso-01-gbo/', icon: 'po-icon-help' }
        ];
    }
    ngOnInit() {
    }
}
SmedComponent.ɵfac = function SmedComponent_Factory(t) { return new (t || SmedComponent)(); };
SmedComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SmedComponent, selectors: [["app-smed"]], decls: 2, vars: 1, consts: [["p-title", "Troca R\u00E1pida de Ferramenta", 3, "p-actions"]], template: function SmedComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "po-page-default", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("p-actions", ctx.actions);
    } }, directives: [_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoPageDefaultComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzbWVkLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SmedComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-smed',
                templateUrl: './smed.component.html',
                styleUrls: ['./smed.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login/login.component */ "vtpD");
/* harmony import */ var _application_application_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./application/application.component */ "j4it");
/* harmony import */ var _application_application_home_application_home_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./application/application-home/application-home.component */ "q0oV");
/* harmony import */ var _application_process_process_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./application/process/process.component */ "O4oB");
/* harmony import */ var _application_process_gbo_gbo_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./application/process/gbo/gbo.component */ "Gu+A");
/* harmony import */ var _application_process_gbo_include_include_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./application/process/gbo/include/include.component */ "N3uM");
/* harmony import */ var _application_process_oee_oee_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./application/process/oee/oee.component */ "1lya");
/* harmony import */ var _application_process_oee_include_include_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./application/process/oee/include/include.component */ "vYRQ");
/* harmony import */ var _application_process_smed_smed_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./application/process/smed/smed.component */ "ry9T");
/* harmony import */ var _application_process_smed_include_include_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./application/process/smed/include/include.component */ "VOxf");
/* harmony import */ var _application_ppcpm_ppcpm_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./application/ppcpm/ppcpm.component */ "8W7V");
/* harmony import */ var _application_ppcpm_project_project_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./application/ppcpm/project/project.component */ "lNWS");
/* harmony import */ var _application_ppcpm_project_project_viewer_project_viewer_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./application/ppcpm/project/project-viewer/project-viewer.component */ "PZI7");
/* harmony import */ var _application_ppcpm_po_po_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./application/ppcpm/po/po.component */ "qa8L");
/* harmony import */ var _application_ppcpm_po_po_viewer_po_viewer_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./application/ppcpm/po/po-viewer/po-viewer.component */ "lHnl");
/* harmony import */ var _application_quality_quality_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./application/quality/quality.component */ "zljb");
/* harmony import */ var _application_quality_pareto_pareto_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./application/quality/pareto/pareto.component */ "aGYT");
/* harmony import */ var _application_quality_pareto_include_include_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./application/quality/pareto/include/include.component */ "0H1/");
/* harmony import */ var _application_helpcenter_helpcenter_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./application/helpcenter/helpcenter.component */ "dnrJ");
/* harmony import */ var _application_helpcenter_helpcenter_home_helpcenter_home_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./application/helpcenter/helpcenter-home/helpcenter-home.component */ "4RW0");
























const routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: _login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"]
    },
    {
        path: 'app',
        component: _application_application_component__WEBPACK_IMPORTED_MODULE_3__["ApplicationComponent"],
        children: [
            {
                path: 'home',
                component: _application_application_home_application_home_component__WEBPACK_IMPORTED_MODULE_4__["ApplicationHomeComponent"]
            },
            {
                path: 'process',
                component: _application_process_process_component__WEBPACK_IMPORTED_MODULE_5__["ProcessComponent"],
                children: [
                    {
                        path: 'gbo',
                        component: _application_process_gbo_gbo_component__WEBPACK_IMPORTED_MODULE_6__["GboComponent"],
                        children: [
                            {
                                path: '',
                                pathMatch: 'full',
                                redirectTo: 'include'
                            },
                            {
                                path: 'include',
                                component: _application_process_gbo_include_include_component__WEBPACK_IMPORTED_MODULE_7__["GboIncludeComponent"]
                            }
                        ]
                    },
                    {
                        path: 'oee',
                        component: _application_process_oee_oee_component__WEBPACK_IMPORTED_MODULE_8__["OeeComponent"],
                        children: [
                            {
                                path: '',
                                pathMatch: 'full',
                                redirectTo: 'include'
                            },
                            {
                                path: 'include',
                                component: _application_process_oee_include_include_component__WEBPACK_IMPORTED_MODULE_9__["OeeIncludeComponent"]
                            }
                        ]
                    },
                    {
                        path: 'smed',
                        component: _application_process_smed_smed_component__WEBPACK_IMPORTED_MODULE_10__["SmedComponent"],
                        children: [
                            {
                                path: '',
                                pathMatch: 'full',
                                redirectTo: 'include'
                            },
                            {
                                path: 'include',
                                component: _application_process_smed_include_include_component__WEBPACK_IMPORTED_MODULE_11__["SmedIncludeComponent"]
                            }
                        ]
                    }
                ]
            },
            {
                path: 'ppcpm',
                component: _application_ppcpm_ppcpm_component__WEBPACK_IMPORTED_MODULE_12__["PpcpmComponent"],
                children: [
                    {
                        path: 'project',
                        component: _application_ppcpm_project_project_component__WEBPACK_IMPORTED_MODULE_13__["ProjectComponent"],
                        children: [
                            {
                                path: '',
                                pathMatch: 'full',
                                redirectTo: 'viewer'
                            },
                            {
                                path: 'viewer',
                                component: _application_ppcpm_project_project_viewer_project_viewer_component__WEBPACK_IMPORTED_MODULE_14__["ProjectViewerComponent"]
                            }
                        ]
                    },
                    {
                        path: 'po',
                        component: _application_ppcpm_po_po_component__WEBPACK_IMPORTED_MODULE_15__["PoComponent"],
                        children: [
                            {
                                path: '',
                                pathMatch: 'full',
                                redirectTo: 'viewer'
                            },
                            {
                                path: 'viewer',
                                component: _application_ppcpm_po_po_viewer_po_viewer_component__WEBPACK_IMPORTED_MODULE_16__["PoViewerComponent"]
                            }
                        ]
                    }
                ]
            },
            {
                path: 'quality',
                component: _application_quality_quality_component__WEBPACK_IMPORTED_MODULE_17__["QualityComponent"],
                children: [
                    {
                        path: 'pareto',
                        component: _application_quality_pareto_pareto_component__WEBPACK_IMPORTED_MODULE_18__["ParetoComponent"],
                        children: [
                            {
                                path: '',
                                pathMatch: 'full',
                                redirectTo: 'include'
                            },
                            {
                                path: 'include',
                                component: _application_quality_pareto_include_include_component__WEBPACK_IMPORTED_MODULE_19__["ParetoIncludeComponent"]
                            }
                        ]
                    }
                ]
            },
            {
                path: 'helpcenter',
                component: _application_helpcenter_helpcenter_component__WEBPACK_IMPORTED_MODULE_20__["HelpcenterComponent"],
                children: [
                    {
                        path: 'home',
                        component: _application_helpcenter_helpcenter_home_helpcenter_home_component__WEBPACK_IMPORTED_MODULE_21__["HelpcenterHomeComponent"]
                    }
                ]
            }
        ]
    }
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes, { relativeLinkResolution: 'legacy' })], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes, { relativeLinkResolution: 'legacy' })],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "vYRQ":
/*!**********************************************************************!*\
  !*** ./src/app/application/process/oee/include/include.component.ts ***!
  \**********************************************************************/
/*! exports provided: OeeIncludeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OeeIncludeComponent", function() { return OeeIncludeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @po-ui/ng-components */ "wBT/");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");





function OeeIncludeComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "po-widget", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "po-widget", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "po-widget", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "po-widget", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r0.oeeRate, " %");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.oeeDescription);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r0.availabilityRate, " %");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.oeeDescription);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r0.performanceRate, " %");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.oeeDescription);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r0.qualityRate, " %");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.oeeDescription);
} }
class OeeIncludeComponent {
    constructor(poNotification) {
        this.poNotification = poNotification;
        this.showResult = false;
    }
    ngOnInit() {
    }
    dataChanged() {
        if (this.totalAvaliableTime && this.totalPlannedStopsTime && this.totalUnplannedStopsTime !== null) {
            this.totalScheduledTime = this.totalAvaliableTime - this.totalPlannedStopsTime - this.totalUnplannedStopsTime;
        }
    }
    insertOee() {
        if (this.totalAvaliableTime && this.totalNonConformingPartsTime && this.totalPlannedStopsTime &&
            this.totalProductiveTime && this.totalScheduledTime && this.totalUnplannedStopsTime != null) {
            this.oeeCalculation();
        }
        else {
            this.oeeError();
        }
    }
    oeeCalculation() {
        const scheduledMinusLosses = this.totalAvaliableTime - this.totalPlannedStopsTime - this.totalUnplannedStopsTime;
        this.availabilityRate = Math.floor((scheduledMinusLosses / this.totalAvaliableTime) * 100);
        this.performanceRate = Math.floor((this.totalProductiveTime / scheduledMinusLosses) * 100);
        this.qualityRate = Math.floor((1 - (this.totalNonConformingPartsTime / this.totalProductiveTime)) * 100);
        const tempOeeRate = (this.availabilityRate / 100) * (this.performanceRate / 100) * (this.qualityRate / 100);
        this.oeeRate = Math.round((tempOeeRate + Number.EPSILON) * 100);
        if (this.oeeRate < 30) {
            this.oeeDescription = 'Sistema de produção com performance baixa';
        }
        else if (this.oeeRate >= 30 && this.oeeRate <= 60) {
            this.oeeDescription = 'Sistema de produção com performance normal';
        }
        else if (this.oeeRate > 60 && this.oeeRate <= 90) {
            this.oeeDescription = 'Sistema de produção com performance alta';
        }
        else if (this.oeeRate > 90) {
            this.oeeDescription = 'Sistema de produção com performance excelente';
        }
        this.showResult = true;
    }
    oeeClean() {
        this.showResult = false;
        this.oeeRate = undefined;
    }
    oeeError() {
        const poNotification = {
            message: 'Campos inválidos, favor verificar as informações',
            duration: 3000
        };
        this.poNotification.warning(poNotification);
    }
}
OeeIncludeComponent.ɵfac = function OeeIncludeComponent_Factory(t) { return new (t || OeeIncludeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoNotificationService"])); };
OeeIncludeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: OeeIncludeComponent, selectors: [["app-oee-include"]], decls: 21, vars: 7, consts: [[1, "row"], [1, "po-md-12"], ["p-label", "Disponibilidade"], ["p-label", "Tempo Total Dispon\u00EDvel", "p-placeholder", "Tempo dispon\u00EDvel para produ\u00E7\u00E3o", "p-name", "Tempo Total", 1, "po-md-4", 3, "ngModel", "ngModelChange"], ["p-label", "Tempo Parado Programado", "p-placeholder", "5s, reuni\u00F5es ...", "p-name", "Tempo Total", 1, "po-md-4", 3, "ngModel", "ngModelChange"], ["p-label", "Tempo Parado N\u00E3o Programado", "p-placeholder", "Quebras, Falta de Pe\u00E7as ...", "p-name", "Tempo Total", 1, "po-md-4", 3, "ngModel", "ngModelChange"], ["p-label", "Performance"], ["p-label", "Tempo Total Te\u00F3rico", "p-placeholder", "Tempo calculado de produ\u00E7\u00E3o", "p-disabled", "true", "p-name", "Tempo Total", 1, "po-md-4", 3, "ngModel", "ngModelChange"], ["p-label", "Tempo Total de Produ\u00E7\u00E3o", "p-placeholder", "Tempo real de produ\u00E7\u00E3o de pe\u00E7as boas", "p-name", "Tempo Total", 1, "po-md-4", 3, "ngModel", "ngModelChange"], ["p-label", "Qualidade"], ["p-label", "Tempo Total de Produ\u00E7\u00E3o de Pe\u00E7as N\u00E3o Conformes", "p-placeholder", "Tempo real de retrabalho, sucata ...", "p-name", "Tempo Total", 1, "po-md-4", 3, "ngModel", "ngModelChange"], ["p-icon", "po-icon-calculator", "p-label", "Calcular", "p-type", "string", 3, "p-click"], ["p-icon", "po-icon-clear-content", "p-label", "Limpar", "p-type", "string", 1, "po-ml-1", 3, "p-click"], [4, "ngIf"], [1, "po-md-3", "po-mt-1"], ["p-title", "Resultado do calculo do OEE/TEEP", "p-primary", "true"], [1, "po-font-title", "po-text-center"], [1, "po-text-center"], ["p-title", "Disponibilidade"], ["p-title", "Performance"], ["p-title", "Qualidade"]], template: function OeeIncludeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "po-container");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "po-divider", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "po-number", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function OeeIncludeComponent_Template_po_number_ngModelChange_5_listener($event) { return ctx.totalAvaliableTime = $event; })("ngModelChange", function OeeIncludeComponent_Template_po_number_ngModelChange_5_listener() { return ctx.dataChanged(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "po-number", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function OeeIncludeComponent_Template_po_number_ngModelChange_6_listener($event) { return ctx.totalPlannedStopsTime = $event; })("ngModelChange", function OeeIncludeComponent_Template_po_number_ngModelChange_6_listener() { return ctx.dataChanged(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "po-number", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function OeeIncludeComponent_Template_po_number_ngModelChange_7_listener($event) { return ctx.totalUnplannedStopsTime = $event; })("ngModelChange", function OeeIncludeComponent_Template_po_number_ngModelChange_7_listener() { return ctx.dataChanged(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "po-divider", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "po-number", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function OeeIncludeComponent_Template_po_number_ngModelChange_11_listener($event) { return ctx.totalScheduledTime = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "po-number", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function OeeIncludeComponent_Template_po_number_ngModelChange_12_listener($event) { return ctx.totalProductiveTime = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "po-divider", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "po-number", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function OeeIncludeComponent_Template_po_number_ngModelChange_16_listener($event) { return ctx.totalNonConformingPartsTime = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "po-button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("p-click", function OeeIncludeComponent_Template_po_button_p_click_18_listener() { return ctx.insertOee(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "po-button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("p-click", function OeeIncludeComponent_Template_po_button_p_click_19_listener() { return ctx.oeeClean(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, OeeIncludeComponent_div_20_Template, 25, 8, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.totalAvaliableTime);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.totalPlannedStopsTime);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.totalUnplannedStopsTime);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.totalScheduledTime);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.totalProductiveTime);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.totalNonConformingPartsTime);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showResult);
    } }, directives: [_po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoContainerComponent"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoDividerComponent"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoNumberComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoButtonComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoWidgetComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJpbmNsdWRlLmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](OeeIncludeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-oee-include',
                templateUrl: './include.component.html',
                styleUrls: ['./include.component.css']
            }]
    }], function () { return [{ type: _po_ui_ng_components__WEBPACK_IMPORTED_MODULE_1__["PoNotificationService"] }]; }, null); })();


/***/ }),

/***/ "vtpD":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _po_ui_ng_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @po-ui/ng-templates */ "nkLZ");




class LoginComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
    }
    loginMethod() {
        this.router.navigate(['/app/home']);
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
LoginComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["app-login"]], decls: 1, vars: 0, consts: [["p-product-name", "Lean App", "p-background", "./assets/images/login-background.jpg", "p-hide-remember-user", "", 3, "p-login-submit"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "po-page-login", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("p-login-submit", function LoginComponent_Template_po_page_login_p_login_submit_0_listener() { return ctx.loginMethod(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_po_ui_ng_templates__WEBPACK_IMPORTED_MODULE_2__["PoPageLoginComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsb2dpbi5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-login',
                templateUrl: './login.component.html',
                styleUrls: ['./login.component.css']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }]; }, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zljb":
/*!**********************************************************!*\
  !*** ./src/app/application/quality/quality.component.ts ***!
  \**********************************************************/
/*! exports provided: QualityComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QualityComponent", function() { return QualityComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");



class QualityComponent {
    constructor() { }
    ngOnInit() {
    }
}
QualityComponent.ɵfac = function QualityComponent_Factory(t) { return new (t || QualityComponent)(); };
QualityComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: QualityComponent, selectors: [["app-quality"]], decls: 1, vars: 0, template: function QualityComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJxdWFsaXR5LmNvbXBvbmVudC5jc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](QualityComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-quality',
                templateUrl: './quality.component.html',
                styleUrls: ['./quality.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map