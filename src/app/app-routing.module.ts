import { AuthGuard } from './_services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'login' , component: LoginComponent },
    { path: 'settings', canActivate:[AuthGuard],  loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
    { path: 'dashboard',canActivate:[AuthGuard],  loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'ceo',canActivate:[AuthGuard],  loadChildren: () => import('./ceo/ceo.module').then(m => m.CeoModule) },
    // { path: 'login1', loadChildren: () => import('./theme/pages/self-layout-blank/snippets/pages/user/user-login-1/user-login-1.module').then(m => m.UserLogin1Module)},
    // { path: 'login2', loadChildren: () => import('./theme/pages/self-layout-blank/snippets/pages/user/user-login-2/user-login-2.module').then(m => m.UserLogin2Module)},
    // { path: 'login3', loadChildren: () => import('./theme/pages/self-layout-blank/snippets/pages/user/user-login-3/user-login-3.module').then(m => m.UserLogin3Module)},
    // { path: 'login4', loadChildren: () => import('./theme/pages/self-layout-blank/snippets/pages/user/user-login-4/user-login-4.module').then(m => m.UserLogin4Module)},
    // { path: 'login5', loadChildren: () => import('./theme/pages/self-layout-blank/snippets/pages/user/user-login-5/user-login-5.module').then(m => m.UserLogin5Module)},
    // { path: 'login6', loadChildren: () => import('./theme/pages/self-layout-blank/snippets/pages/user/user-login-6/user-login-6.module').then(m => m.UserLogin6Module)},
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    // {
    //     "path": "theme",
    //     "component": ThemeComponent,
    //     "children": [
    //         {
    //             "path": "angular/ng-bootstrap",
    //             "loadChildren": () => import('./theme/pages/default/angular/ng-bootstrap/ng-bootstrap.module').then(m => m.NgBootstrapModule)
    //         },
    //         {
    //             "path": "angular/primeng",
    //             "loadChildren": () => import('./theme/pages/default/angular/primeng/primeng.module').then(m => m.PrimengModule)
    //         },
    //         {
    //             "path": "index",
    //             "loadChildren": () => import('./theme/pages/default/index/index.module').then(m => m.IndexModule)
    //         },
    //         {
    //             "path": "components/base/typography",
    //             "loadChildren": () => import('./theme/pages/default/components/base/base-typography/base-typography.module').then(m => m.BaseTypographyModule)
    //         },
    //         {
    //             "path": "components/base/state",
    //             "loadChildren": () => import('./theme/pages/default/components/base/base-state/base-state.module').then(m => m.BaseStateModule)
    //         },
    //         {
    //             "path": "components/base/stack",
    //             "loadChildren": () => import('./theme/pages/default/components/base/base-stack/base-stack.module').then(m => m.BaseStackModule)
    //         },
    //         {
    //             "path": "components/base/tables",
    //             "loadChildren": () => import('./theme/pages/default/components/base/base-tables/base-tables.module').then(m => m.BaseTablesModule)
    //         },
    //         {
    //             "path": "components/base/modal",
    //             "loadChildren": () => import('./theme/pages/default/components/base/base-modal/base-modal.module').then(m => m.BaseModalModule)
    //         },
    //         {
    //             "path": "components/base/alerts",
    //             "loadChildren": () => import('./theme/pages/default/components/base/base-alerts/base-alerts.module').then(m => m.BaseAlertsModule)
    //         },
    //         {
    //             "path": "components/base/progress",
    //             "loadChildren": () => import('./theme/pages/default/components/base/base-progress/base-progress.module').then(m => m.BaseProgressModule)
    //         },
    //         {
    //             "path": "components/base/popover",
    //             "loadChildren": () => import('./theme/pages/default/components/base/base-popover/base-popover.module').then(m => m.BasePopoverModule)
    //         },
    //         {
    //             "path": "components/base/tooltip",
    //             "loadChildren": () => import('./theme/pages/default/components/base/base-tooltip/base-tooltip.module').then(m => m.BaseTooltipModule)
    //         },
    //         {
    //             "path": "components/base/blockui",
    //             "loadChildren": () => import('./theme/pages/default/components/base/base-blockui/base-blockui.module').then(m => m.BaseBlockuiModule)
    //         },
    //         {
    //             "path": "components/base/spinners",
    //             "loadChildren": () => import('./theme/pages/default/components/base/base-spinners/base-spinners.module').then(m => m.BaseSpinnersModule)
    //         },
    //         {
    //             "path": "components/base/scrollable",
    //             "loadChildren": () => import('./theme/pages/default/components/base/base-scrollable/base-scrollable.module').then(m => m.BaseScrollableModule)
    //         },
    //         {
    //             "path": "components/base/dropdown",
    //             "loadChildren": () => import('./theme/pages/default/components/base/base-dropdown/base-dropdown.module').then(m => m.BaseDropdownModule)
    //         },
    //         {
    //             "path": "components/base/tabs/bootstrap",
    //             "loadChildren": () => import('./theme/pages/default/components/base/tabs/tabs-bootstrap/tabs-bootstrap.module').then(m => m.TabsBootstrapModule)
    //         },
    //         {
    //             "path": "components/base/tabs/line",
    //             "loadChildren": () => import('./theme/pages/default/components/base/tabs/tabs-line/tabs-line.module').then(m => m.TabsLineModule)
    //         },
    //         {
    //             "path": "components/base/accordions",
    //             "loadChildren": () => import('./theme/pages/default/components/base/base-accordions/base-accordions.module').then(m => m.BaseAccordionsModule)
    //         },
    //         {
    //             "path": "components/base/navs",
    //             "loadChildren": () => import('./theme/pages/default/components/base/base-navs/base-navs.module').then(m => m.BaseNavsModule)
    //         },
    //         {
    //             "path": "components/base/lists",
    //             "loadChildren": () => import('./theme/pages/default/components/base/base-lists/base-lists.module').then(m => m.BaseListsModule)
    //         },
    //         {
    //             "path": "components/base/treeview",
    //             "loadChildren": () => import('./theme/pages/default/components/base/base-treeview/base-treeview.module').then(m => m.BaseTreeviewModule)
    //         },
    //         {
    //             "path": "components/base/bootstrap-notify",
    //             "loadChildren": () => import('./theme/pages/default/components/base/base-bootstrap-notify/base-bootstrap-notify.module').then(m => m.BaseBootstrapNotifyModule)
    //         },
    //         {
    //             "path": "components/base/toastr",
    //             "loadChildren": () => import('./theme/pages/default/components/base/base-toastr/base-toastr.module').then(m => m.BaseToastrModule)
    //         },
    //         {
    //             "path": "components/base/sweetalert2",
    //             "loadChildren": () => import('./theme/pages/default/components/base/base-sweetalert2/base-sweetalert2.module').then(m => m.BaseSweetalert2Module)
    //         },
    //         {
    //             "path": "components/icons/flaticon",
    //             "loadChildren": () => import('./theme/pages/default/components/icons/icons-flaticon/icons-flaticon.module').then(m => m.IconsFlaticonModule)
    //         },
    //         {
    //             "path": "components/icons/fontawesome5",
    //             "loadChildren": () => import('./theme/pages/default/components/icons/icons-fontawesome5/icons-fontawesome5.module').then(m => m.IconsFontawesome5Module)
    //         },
    //         {
    //             "path": "components/icons/lineawesome",
    //             "loadChildren": () => import('./theme/pages/default/components/icons/icons-lineawesome/icons-lineawesome.module').then(m => m.IconsLineawesomeModule)
    //         },
    //         {
    //             "path": "components/icons/socicons",
    //             "loadChildren": () => import('./theme/pages/default/components/icons/icons-socicons/icons-socicons.module').then(m => m.IconsSociconsModule)
    //         },
    //         {
    //             "path": "components/buttons/base/default",
    //             "loadChildren": () => import('./theme/pages/default/components/buttons/base/base-default/base-default.module').then(m => m.BaseDefaultModule)
    //         },
    //         {
    //             "path": "components/buttons/base/square",
    //             "loadChildren": () => import('./theme/pages/default/components/buttons/base/base-square/base-square.module').then(m => m.BaseSquareModule)
    //         },
    //         {
    //             "path": "components/buttons/base/pill",
    //             "loadChildren": () => import('./theme/pages/default/components/buttons/base/base-pill/base-pill.module').then(m => m.BasePillModule)
    //         },
    //         {
    //             "path": "components/buttons/base/air",
    //             "loadChildren": () => import('./theme/pages/default/components/buttons/base/base-air/base-air.module').then(m => m.BaseAirModule)
    //         },
    //         {
    //             "path": "components/buttons/group",
    //             "loadChildren": () => import('./theme/pages/default/components/buttons/buttons-group/buttons-group.module').then(m => m.ButtonsGroupModule)
    //         },
    //         {
    //             "path": "components/buttons/dropdown",
    //             "loadChildren": () => import('./theme/pages/default/components/buttons/buttons-dropdown/buttons-dropdown.module').then(m => m.ButtonsDropdownModule)
    //         },
    //         {
    //             "path": "components/buttons/icon/lineawesome",
    //             "loadChildren": () => import('./theme/pages/default/components/buttons/icon/icon-lineawesome/icon-lineawesome.module').then(m => m.IconLineawesomeModule)
    //         },
    //         {
    //             "path": "components/buttons/icon/fontawesome",
    //             "loadChildren": () => import('./theme/pages/default/components/buttons/icon/icon-fontawesome/icon-fontawesome.module').then(m => m.IconFontawesomeModule)
    //         },
    //         {
    //             "path": "components/buttons/icon/flaticon",
    //             "loadChildren": () => import('./theme/pages/default/components/buttons/icon/icon-flaticon/icon-flaticon.module').then(m => m.IconFlaticonModule)
    //         },
    //         {
    //             "path": "components/buttons/spinner",
    //             "loadChildren": () => import('./theme/pages/default/components/buttons/buttons-spinner/buttons-spinner.module').then(m => m.ButtonsSpinnerModule)
    //         },
    //         {
    //             "path": "components/portlets/base",
    //             "loadChildren": () => import('./theme/pages/default/components/portlets/portlets-base/portlets-base.module').then(m => m.PortletsBaseModule)
    //         },
    //         {
    //             "path": "components/portlets/advanced",
    //             "loadChildren": () => import('./theme/pages/default/components/portlets/portlets-advanced/portlets-advanced.module').then(m => m.PortletsAdvancedModule)
    //         },
    //         {
    //             "path": "components/portlets/creative",
    //             "loadChildren": () => import('./theme/pages/default/components/portlets/portlets-creative/portlets-creative.module').then(m => m.PortletsCreativeModule)
    //         },
    //         {
    //             "path": "components/portlets/tabbed",
    //             "loadChildren": () => import('./theme/pages/default/components/portlets/portlets-tabbed/portlets-tabbed.module').then(m => m.PortletsTabbedModule)
    //         },
    //         {
    //             "path": "components/portlets/draggable",
    //             "loadChildren": () => import('./theme/pages/default/components/portlets/portlets-draggable/portlets-draggable.module').then(m => m.PortletsDraggableModule)
    //         },
    //         {
    //             "path": "components/portlets/tools",
    //             "loadChildren": () => import('./theme/pages/default/components/portlets/portlets-tools/portlets-tools.module').then(m => m.PortletsToolsModule)
    //         },
    //         {
    //             "path": "components/portlets/sticky-head",
    //             "loadChildren": () => import('./theme/pages/default/components/portlets/portlets-sticky-head/portlets-sticky-head.module').then(m => m.PortletsStickyHeadModule)
    //         },
    //         {
    //             "path": "components/timeline/timeline-1",
    //             "loadChildren": () => import('./theme/pages/default/components/timeline/timeline-timeline-1/timeline-timeline-1.module').then(m => m.TimelineTimeline1Module)
    //         },
    //         {
    //             "path": "components/timeline/timeline-2",
    //             "loadChildren": () => import('./theme/pages/default/components/timeline/timeline-timeline-2/timeline-timeline-2.module').then(m => m.TimelineTimeline2Module)
    //         },
    //         {
    //             "path": "components/widgets/general",
    //             "loadChildren": () => import('./theme/pages/default/components/widgets/widgets-general/widgets-general.module').then(m => m.WidgetsGeneralModule)
    //         },
    //         {
    //             "path": "components/widgets/chart",
    //             "loadChildren": () => import('./theme/pages/default/components/widgets/widgets-chart/widgets-chart.module').then(m => m.WidgetsChartModule)
    //         },
    //         {
    //             "path": "components/calendar/basic",
    //             "loadChildren": () => import('./theme/pages/default/components/calendar/calendar-basic/calendar-basic.module').then(m => m.CalendarBasicModule)
    //         },
    //         {
    //             "path": "components/calendar/list-view",
    //             "loadChildren": () => import('./theme/pages/default/components/calendar/calendar-list-view/calendar-list-view.module').then(m => m.CalendarListViewModule)
    //         },
    //         {
    //             "path": "components/calendar/google",
    //             "loadChildren": () => import('./theme/pages/default/components/calendar/calendar-google/calendar-google.module').then(m => m.CalendarGoogleModule)
    //         },
    //         {
    //             "path": "components/calendar/external-events",
    //             "loadChildren": () => import('./theme/pages/default/components/calendar/calendar-external-events/calendar-external-events.module').then(m => m.CalendarExternalEventsModule)
    //         },
    //         {
    //             "path": "components/calendar/background-events",
    //             "loadChildren": () => import('./theme/pages/default/components/calendar/calendar-background-events/calendar-background-events.module').then(m => m.CalendarBackgroundEventsModule)
    //         },
    //         {
    //             "path": "components/charts/amcharts/charts",
    //             "loadChildren": () => import('./theme/pages/default/components/charts/amcharts/amcharts-charts/amcharts-charts.module').then(m => m.AmchartsChartsModule)
    //         },
    //         {
    //             "path": "components/charts/amcharts/stock-charts",
    //             "loadChildren": () => import('./theme/pages/default/components/charts/amcharts/amcharts-stock-charts/amcharts-stock-charts.module').then(m => m.AmchartsStockChartsModule)
    //         },
    //         {
    //             "path": "components/charts/amcharts/maps",
    //             "loadChildren": () => import('./theme/pages/default/components/charts/amcharts/amcharts-maps/amcharts-maps.module').then(m => m.AmchartsMapsModule)
    //         },
    //         {
    //             "path": "components/charts/flotcharts",
    //             "loadChildren": () => import('./theme/pages/default/components/charts/charts-flotcharts/charts-flotcharts.module').then(m => m.ChartsFlotchartsModule)
    //         },
    //         {
    //             "path": "components/charts/google-charts",
    //             "loadChildren": () => import('./theme/pages/default/components/charts/charts-google-charts/charts-google-charts.module').then(m => m.ChartsGoogleChartsModule)
    //         },
    //         {
    //             "path": "components/charts/morris-charts",
    //             "loadChildren": () => import('./theme/pages/default/components/charts/charts-morris-charts/charts-morris-charts.module').then(m => m.ChartsMorrisChartsModule)
    //         },
    //         {
    //             "path": "components/maps/google-maps",
    //             "loadChildren": () => import('./theme/pages/default/components/maps/maps-google-maps/maps-google-maps.module').then(m => m.MapsGoogleMapsModule)
    //         },
    //         {
    //             "path": "components/maps/jqvmap",
    //             "loadChildren": () => import('./theme/pages/default/components/maps/maps-jqvmap/maps-jqvmap.module').then(m => m.MapsJqvmapModule)
    //         },
    //         {
    //             "path": "components/utils/idle-timer",
    //             "loadChildren": () => import('./theme/pages/default/components/utils/utils-idle-timer/utils-idle-timer.module').then(m => m.UtilsIdleTimerModule)
    //         },
    //         {
    //             "path": "components/utils/session-timeout",
    //             "loadChildren": () => import('./theme/pages/default/components/utils/utils-session-timeout/utils-session-timeout.module').then(m => m.UtilsSessionTimeoutModule)
    //         },
    //         {
    //             "path": "crud/forms/controls/base",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/controls/controls-base/controls-base.module').then(m => m.ControlsBaseModule)
    //         },
    //         {
    //             "path": "crud/forms/controls/checkbox-radio",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/controls/controls-checkbox-radio/controls-checkbox-radio.module').then(m => m.ControlsCheckboxRadioModule)
    //         },
    //         {
    //             "path": "crud/forms/controls/switch",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/controls/controls-switch/controls-switch.module').then(m => m.ControlsSwitchModule)
    //         },
    //         {
    //             "path": "crud/forms/controls/input-group",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/controls/controls-input-group/controls-input-group.module').then(m => m.ControlsInputGroupModule)
    //         },
    //         {
    //             "path": "crud/forms/controls/option",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/controls/controls-option/controls-option.module').then(m => m.ControlsOptionModule)
    //         },
    //         {
    //             "path": "crud/forms/widgets/bootstrap-datepicker",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/widgets/widgets-bootstrap-datepicker/widgets-bootstrap-datepicker.module').then(m => m.WidgetsBootstrapDatepickerModule)
    //         },
    //         {
    //             "path": "crud/forms/widgets/bootstrap-datetimepicker",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/widgets/widgets-bootstrap-datetimepicker/widgets-bootstrap-datetimepicker.module').then(m => m.WidgetsBootstrapDatetimepickerModule)
    //         },
    //         {
    //             "path": "crud/forms/widgets/bootstrap-timepicker",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/widgets/widgets-bootstrap-timepicker/widgets-bootstrap-timepicker.module').then(m => m.WidgetsBootstrapTimepickerModule)
    //         },
    //         {
    //             "path": "crud/forms/widgets/bootstrap-daterangepicker",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/widgets/widgets-bootstrap-daterangepicker/widgets-bootstrap-daterangepicker.module').then(m => m.WidgetsBootstrapDaterangepickerModule)
    //         },
    //         {
    //             "path": "crud/forms/widgets/bootstrap-touchspin",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/widgets/widgets-bootstrap-touchspin/widgets-bootstrap-touchspin.module').then(m => m.WidgetsBootstrapTouchspinModule)
    //         },
    //         {
    //             "path": "crud/forms/widgets/bootstrap-maxlength",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/widgets/widgets-bootstrap-maxlength/widgets-bootstrap-maxlength.module').then(m => m.WidgetsBootstrapMaxlengthModule)
    //         },
    //         {
    //             "path": "crud/forms/widgets/bootstrap-switch",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/widgets/widgets-bootstrap-switch/widgets-bootstrap-switch.module').then(m => m.WidgetsBootstrapSwitchModule)
    //         },
    //         {
    //             "path": "crud/forms/widgets/bootstrap-multipleselectsplitter",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/widgets/widgets-bootstrap-multipleselectsplitter/widgets-bootstrap-multipleselectsplitter.module').then(m => m.WidgetsBootstrapMultipleselectsplitterModule)
    //         },
    //         {
    //             "path": "crud/forms/widgets/bootstrap-select",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/widgets/widgets-bootstrap-select/widgets-bootstrap-select.module').then(m => m.WidgetsBootstrapSelectModule)
    //         },
    //         {
    //             "path": "crud/forms/widgets/select2",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/widgets/widgets-select2/widgets-select2.module').then(m => m.WidgetsSelect2Module)
    //         },
    //         {
    //             "path": "crud/forms/widgets/typeahead",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/widgets/widgets-typeahead/widgets-typeahead.module').then(m => m.WidgetsTypeaheadModule)
    //         },
    //         {
    //             "path": "crud/forms/widgets/nouislider",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/widgets/widgets-nouislider/widgets-nouislider.module').then(m => m.WidgetsNouisliderModule)
    //         },
    //         {
    //             "path": "crud/forms/widgets/form-repeater",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/widgets/widgets-form-repeater/widgets-form-repeater.module').then(m => m.WidgetsFormRepeaterModule)
    //         },
    //         {
    //             "path": "crud/forms/widgets/ion-range-slider",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/widgets/widgets-ion-range-slider/widgets-ion-range-slider.module').then(m => m.WidgetsIonRangeSliderModule)
    //         },
    //         {
    //             "path": "crud/forms/widgets/input-mask",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/widgets/widgets-input-mask/widgets-input-mask.module').then(m => m.WidgetsInputMaskModule)
    //         },
    //         {
    //             "path": "crud/forms/widgets/autosize",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/widgets/widgets-autosize/widgets-autosize.module').then(m => m.WidgetsAutosizeModule)
    //         },
    //         {
    //             "path": "crud/forms/widgets/clipboard",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/widgets/widgets-clipboard/widgets-clipboard.module').then(m => m.WidgetsClipboardModule)
    //         },
    //         {
    //             "path": "crud/forms/widgets/dropzone",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/widgets/widgets-dropzone/widgets-dropzone.module').then(m => m.WidgetsDropzoneModule)
    //         },
    //         {
    //             "path": "crud/forms/widgets/recaptcha",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/widgets/widgets-recaptcha/widgets-recaptcha.module').then(m => m.WidgetsRecaptchaModule)
    //         },
    //         {
    //             "path": "crud/forms/widgets/summernote",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/widgets/widgets-summernote/widgets-summernote.module').then(m => m.WidgetsSummernoteModule)
    //         },
    //         {
    //             "path": "crud/forms/widgets/bootstrap-markdown",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/widgets/widgets-bootstrap-markdown/widgets-bootstrap-markdown.module').then(m => m.WidgetsBootstrapMarkdownModule)
    //         },
    //         {
    //             "path": "crud/forms/layouts/default-forms",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/layouts/layouts-default-forms/layouts-default-forms.module').then(m => m.LayoutsDefaultFormsModule)
    //         },
    //         {
    //             "path": "crud/forms/layouts/multi-column-forms",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/layouts/layouts-multi-column-forms/layouts-multi-column-forms.module').then(m => m.LayoutsMultiColumnFormsModule)
    //         },
    //         {
    //             "path": "crud/forms/layouts/action-bars",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/layouts/layouts-action-bars/layouts-action-bars.module').then(m => m.LayoutsActionBarsModule)
    //         },
    //         {
    //             "path": "crud/forms/layouts/sticky-action-bar",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/layouts/layouts-sticky-action-bar/layouts-sticky-action-bar.module').then(m => m.LayoutsStickyActionBarModule)
    //         },
    //         {
    //             "path": "crud/forms/validation/states",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/validation/validation-states/validation-states.module').then(m => m.ValidationStatesModule)
    //         },
    //         {
    //             "path": "crud/forms/validation/form-controls",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/validation/validation-form-controls/validation-form-controls.module').then(m => m.ValidationFormControlsModule)
    //         },
    //         {
    //             "path": "crud/forms/validation/form-widgets",
    //             "loadChildren": () => import('./theme/pages/default/crud/forms/validation/validation-form-widgets/validation-form-widgets.module').then(m => m.ValidationFormWidgetsModule)
    //         },
    //         {
    //             "path": "crud/wizard/wizard-1",
    //             "loadChildren": () => import('./theme/pages/default/crud/wizard/wizard-wizard-1/wizard-wizard-1.module').then(m => m.WizardWizard1Module)
    //         },
    //         {
    //             "path": "crud/wizard/wizard-2",
    //             "loadChildren": () => import('./theme/pages/default/crud/wizard/wizard-wizard-2/wizard-wizard-2.module').then(m => m.WizardWizard2Module)
    //         },
    //         {
    //             "path": "crud/wizard/wizard-3",
    //             "loadChildren": () => import('./theme/pages/default/crud/wizard/wizard-wizard-3/wizard-wizard-3.module').then(m => m.WizardWizard3Module)
    //         },
    //         {
    //             "path": "crud/wizard/wizard-4",
    //             "loadChildren": () => import('./theme/pages/default/crud/wizard/wizard-wizard-4/wizard-wizard-4.module').then(m => m.WizardWizard4Module)
    //         },
    //         {
    //             "path": "crud/wizard/wizard-5",
    //             "loadChildren": () => import('./theme/pages/default/crud/wizard/wizard-wizard-5/wizard-wizard-5.module').then(m => m.WizardWizard5Module)
    //         },
    //         {
    //             "path": "crud/metronic-datatable/base/data-local",
    //             "loadChildren": () => import('./theme/pages/default/crud/metronic-datatable/base/base-data-local/base-data-local.module').then(m => m.BaseDataLocalModule)
    //         },
    //         {
    //             "path": "crud/metronic-datatable/base/data-json",
    //             "loadChildren": () => import('./theme/pages/default/crud/metronic-datatable/base/base-data-json/base-data-json.module').then(m => m.BaseDataJsonModule)
    //         },
    //         {
    //             "path": "crud/metronic-datatable/base/data-ajax",
    //             "loadChildren": () => import('./theme/pages/default/crud/metronic-datatable/base/base-data-ajax/base-data-ajax.module').then(m => m.BaseDataAjaxModule)
    //         },
    //         {
    //             "path": "crud/metronic-datatable/base/record-selection",
    //             "loadChildren": () => import('./theme/pages/default/crud/metronic-datatable/base/base-record-selection/base-record-selection.module').then(m => m.BaseRecordSelectionModule)
    //         },
    //         {
    //             "path": "crud/metronic-datatable/base/column-rendering",
    //             "loadChildren": () => import('./theme/pages/default/crud/metronic-datatable/base/base-column-rendering/base-column-rendering.module').then(m => m.BaseColumnRenderingModule)
    //         },
    //         {
    //             "path": "crud/metronic-datatable/base/row-details",
    //             "loadChildren": () => import('./theme/pages/default/crud/metronic-datatable/base/base-row-details/base-row-details.module').then(m => m.BaseRowDetailsModule)
    //         },
    //         {
    //             "path": "crud/metronic-datatable/base/column-width",
    //             "loadChildren": () => import('./theme/pages/default/crud/metronic-datatable/base/base-column-width/base-column-width.module').then(m => m.BaseColumnWidthModule)
    //         },
    //         {
    //             "path": "crud/metronic-datatable/base/responsive-columns",
    //             "loadChildren": () => import('./theme/pages/default/crud/metronic-datatable/base/base-responsive-columns/base-responsive-columns.module').then(m => m.BaseResponsiveColumnsModule)
    //         },
    //         {
    //             "path": "crud/metronic-datatable/base/translation",
    //             "loadChildren": () => import('./theme/pages/default/crud/metronic-datatable/base/base-translation/base-translation.module').then(m => m.BaseTranslationModule)
    //         },
    //         {
    //             "path": "crud/metronic-datatable/base/local-sort",
    //             "loadChildren": () => import('./theme/pages/default/crud/metronic-datatable/base/base-local-sort/base-local-sort.module').then(m => m.BaseLocalSortModule)
    //         },
    //         {
    //             "path": "crud/metronic-datatable/base/html-table",
    //             "loadChildren": () => import('./theme/pages/default/crud/metronic-datatable/base/base-html-table/base-html-table.module').then(m => m.BaseHtmlTableModule)
    //         },
    //         {
    //             "path": "crud/metronic-datatable/base/auto-column-hide",
    //             "loadChildren": () => import('./theme/pages/default/crud/metronic-datatable/base/base-auto-column-hide/base-auto-column-hide.module').then(m => m.BaseAutoColumnHideModule)
    //         },
    //         {
    //             "path": "crud/metronic-datatable/scrolling/vertical",
    //             "loadChildren": () => import('./theme/pages/default/crud/metronic-datatable/scrolling/scrolling-vertical/scrolling-vertical.module').then(m => m.ScrollingVerticalModule)
    //         },
    //         {
    //             "path": "crud/metronic-datatable/scrolling/horizontal",
    //             "loadChildren": () => import('./theme/pages/default/crud/metronic-datatable/scrolling/scrolling-horizontal/scrolling-horizontal.module').then(m => m.ScrollingHorizontalModule)
    //         },
    //         {
    //             "path": "crud/metronic-datatable/scrolling/both",
    //             "loadChildren": () => import('./theme/pages/default/crud/metronic-datatable/scrolling/scrolling-both/scrolling-both.module').then(m => m.ScrollingBothModule)
    //         },
    //         {
    //             "path": "crud/metronic-datatable/locked/left",
    //             "loadChildren": () => import('./theme/pages/default/crud/metronic-datatable/locked/locked-left/locked-left.module').then(m => m.LockedLeftModule)
    //         },
    //         {
    //             "path": "crud/metronic-datatable/locked/right",
    //             "loadChildren": () => import('./theme/pages/default/crud/metronic-datatable/locked/locked-right/locked-right.module').then(m => m.LockedRightModule)
    //         },
    //         {
    //             "path": "crud/metronic-datatable/locked/both",
    //             "loadChildren": () => import('./theme/pages/default/crud/metronic-datatable/locked/locked-both/locked-both.module').then(m => m.LockedBothModule)
    //         },
    //         {
    //             "path": "crud/metronic-datatable/locked/html-table",
    //             "loadChildren": () => import('./theme/pages/default/crud/metronic-datatable/locked/locked-html-table/locked-html-table.module').then(m => m.LockedHtmlTableModule)
    //         },
    //         {
    //             "path": "crud/metronic-datatable/child/data-local",
    //             "loadChildren": () => import('./theme/pages/default/crud/metronic-datatable/child/child-data-local/child-data-local.module').then(m => m.ChildDataLocalModule)
    //         },
    //         {
    //             "path": "crud/metronic-datatable/child/data-ajax",
    //             "loadChildren": () => import('./theme/pages/default/crud/metronic-datatable/child/child-data-ajax/child-data-ajax.module').then(m => m.ChildDataAjaxModule)
    //         },
    //         {
    //             "path": "crud/metronic-datatable/api/methods",
    //             "loadChildren": () => import('./theme/pages/default/crud/metronic-datatable/api/api-methods/api-methods.module').then(m => m.ApiMethodsModule)
    //         },
    //         {
    //             "path": "crud/metronic-datatable/api/events",
    //             "loadChildren": () => import('./theme/pages/default/crud/metronic-datatable/api/api-events/api-events.module').then(m => m.ApiEventsModule)
    //         },
    //         {
    //             "path": "crud/datatables/basic/basic",
    //             "loadChildren": () => import('./theme/pages/default/crud/datatables/basic/basic-basic/basic-basic.module').then(m => m.BasicBasicModule)
    //         },
    //         {
    //             "path": "crud/datatables/basic/headers",
    //             "loadChildren": () => import('./theme/pages/default/crud/datatables/basic/basic-headers/basic-headers.module').then(m => m.BasicHeadersModule)
    //         },
    //         {
    //             "path": "crud/datatables/basic/paginations",
    //             "loadChildren": () => import('./theme/pages/default/crud/datatables/basic/basic-paginations/basic-paginations.module').then(m => m.BasicPaginationsModule)
    //         },
    //         {
    //             "path": "crud/datatables/basic/scrollable",
    //             "loadChildren": () => import('./theme/pages/default/crud/datatables/basic/basic-scrollable/basic-scrollable.module').then(m => m.BasicScrollableModule)
    //         },
    //         {
    //             "path": "crud/datatables/advanced/column-rendering",
    //             "loadChildren": () => import('./theme/pages/default/crud/datatables/advanced/advanced-column-rendering/advanced-column-rendering.module').then(m => m.AdvancedColumnRenderingModule)
    //         },
    //         {
    //             "path": "crud/datatables/advanced/multiple-controls",
    //             "loadChildren": () => import('./theme/pages/default/crud/datatables/advanced/advanced-multiple-controls/advanced-multiple-controls.module').then(m => m.AdvancedMultipleControlsModule)
    //         },
    //         {
    //             "path": "crud/datatables/advanced/column-visibility",
    //             "loadChildren": () => import('./theme/pages/default/crud/datatables/advanced/advanced-column-visibility/advanced-column-visibility.module').then(m => m.AdvancedColumnVisibilityModule)
    //         },
    //         {
    //             "path": "crud/datatables/advanced/row-callback",
    //             "loadChildren": () => import('./theme/pages/default/crud/datatables/advanced/advanced-row-callback/advanced-row-callback.module').then(m => m.AdvancedRowCallbackModule)
    //         },
    //         {
    //             "path": "crud/datatables/advanced/row-grouping",
    //             "loadChildren": () => import('./theme/pages/default/crud/datatables/advanced/advanced-row-grouping/advanced-row-grouping.module').then(m => m.AdvancedRowGroupingModule)
    //         },
    //         {
    //             "path": "crud/datatables/advanced/footer-callback",
    //             "loadChildren": () => import('./theme/pages/default/crud/datatables/advanced/advanced-footer-callback/advanced-footer-callback.module').then(m => m.AdvancedFooterCallbackModule)
    //         },
    //         {
    //             "path": "crud/datatables/data-sources/html",
    //             "loadChildren": () => import('./theme/pages/default/crud/datatables/data-sources/data-sources-html/data-sources-html.module').then(m => m.DataSourcesHtmlModule)
    //         },
    //         {
    //             "path": "crud/datatables/data-sources/javascript",
    //             "loadChildren": () => import('./theme/pages/default/crud/datatables/data-sources/data-sources-javascript/data-sources-javascript.module').then(m => m.DataSourcesJavascriptModule)
    //         },
    //         {
    //             "path": "crud/datatables/data-sources/ajax-client-side",
    //             "loadChildren": () => import('./theme/pages/default/crud/datatables/data-sources/data-sources-ajax-client-side/data-sources-ajax-client-side.module').then(m => m.DataSourcesAjaxClientSideModule)
    //         },
    //         {
    //             "path": "crud/datatables/data-sources/ajax-server-side",
    //             "loadChildren": () => import('./theme/pages/default/crud/datatables/data-sources/data-sources-ajax-server-side/data-sources-ajax-server-side.module').then(m => m.DataSourcesAjaxServerSideModule)
    //         },
    //         {
    //             "path": "crud/datatables/extensions/buttons",
    //             "loadChildren": () => import('./theme/pages/default/crud/datatables/extensions/extensions-buttons/extensions-buttons.module').then(m => m.ExtensionsButtonsModule)
    //         },
    //         {
    //             "path": "crud/datatables/extensions/colreorder",
    //             "loadChildren": () => import('./theme/pages/default/crud/datatables/extensions/extensions-colreorder/extensions-colreorder.module').then(m => m.ExtensionsColreorderModule)
    //         },
    //         {
    //             "path": "crud/datatables/extensions/keytable",
    //             "loadChildren": () => import('./theme/pages/default/crud/datatables/extensions/extensions-keytable/extensions-keytable.module').then(m => m.ExtensionsKeytableModule)
    //         },
    //         {
    //             "path": "crud/datatables/extensions/responsive",
    //             "loadChildren": () => import('./theme/pages/default/crud/datatables/extensions/extensions-responsive/extensions-responsive.module').then(m => m.ExtensionsResponsiveModule)
    //         },
    //         {
    //             "path": "crud/datatables/extensions/rowgroup",
    //             "loadChildren": () => import('./theme/pages/default/crud/datatables/extensions/extensions-rowgroup/extensions-rowgroup.module').then(m => m.ExtensionsRowgroupModule)
    //         },
    //         {
    //             "path": "crud/datatables/extensions/rowreorder",
    //             "loadChildren": () => import('./theme/pages/default/crud/datatables/extensions/extensions-rowreorder/extensions-rowreorder.module').then(m => m.ExtensionsRowreorderModule)
    //         },
    //         {
    //             "path": "crud/datatables/extensions/scroller",
    //             "loadChildren": () => import('./theme/pages/default/crud/datatables/extensions/extensions-scroller/extensions-scroller.module').then(m => m.ExtensionsScrollerModule)
    //         },
    //         {
    //             "path": "crud/datatables/extensions/select",
    //             "loadChildren": () => import('./theme/pages/default/crud/datatables/extensions/extensions-select/extensions-select.module').then(m => m.ExtensionsSelectModule)
    //         },
    //         {
    //             "path": "crud/datatables/search-options/column-search",
    //             "loadChildren": () => import('./theme/pages/default/crud/datatables/search-options/search-options-column-search/search-options-column-search.module').then(m => m.SearchOptionsColumnSearchModule)
    //         },
    //         {
    //             "path": "crud/datatables/search-options/advanced-search",
    //             "loadChildren": () => import('./theme/pages/default/crud/datatables/search-options/search-options-advanced-search/search-options-advanced-search.module').then(m => m.SearchOptionsAdvancedSearchModule)
    //         },
    //         {
    //             "path": "snippets/general/pricing-tables/pricing-table-1",
    //             "loadChildren": () => import('./theme/pages/aside-left-minimize-default-enabled/snippets/general/pricing-tables/pricing-tables-pricing-table-1/pricing-tables-pricing-table-1.module').then(m => m.PricingTablesPricingTable1Module)
    //         },
    //         {
    //             "path": "snippets/general/pricing-tables/pricing-table-2",
    //             "loadChildren": () => import('./theme/pages/aside-left-minimize-default-enabled/snippets/general/pricing-tables/pricing-tables-pricing-table-2/pricing-tables-pricing-table-2.module').then(m => m.PricingTablesPricingTable2Module)
    //         },
    //         {
    //             "path": "snippets/general/pricing-tables/pricing-table-3",
    //             "loadChildren": () => import('./theme/pages/aside-left-minimize-default-enabled/snippets/general/pricing-tables/pricing-tables-pricing-table-3/pricing-tables-pricing-table-3.module').then(m => m.PricingTablesPricingTable3Module)
    //         },
    //         {
    //             "path": "snippets/general/pricing-tables/pricing-table-4",
    //             "loadChildren": () => import('./theme/pages/aside-left-minimize-default-enabled/snippets/general/pricing-tables/pricing-tables-pricing-table-4/pricing-tables-pricing-table-4.module').then(m => m.PricingTablesPricingTable4Module)
    //         },
    //         {
    //             "path": "snippets/faq/faq-1",
    //             "loadChildren": () => import('./theme/pages/default/snippets/faq/faq-faq-1/faq-faq-1.module').then(m => m.FaqFaq1Module)
    //         },
    //         {
    //             "path": "snippets/invoices/invoice-1",
    //             "loadChildren": () => import('./theme/pages/default/snippets/invoices/invoices-invoice-1/invoices-invoice-1.module').then(m => m.InvoicesInvoice1Module)
    //         },
    //         {
    //             "path": "snippets/invoices/invoice-2",
    //             "loadChildren": () => import('./theme/pages/default/snippets/invoices/invoices-invoice-2/invoices-invoice-2.module').then(m => m.InvoicesInvoice2Module)
    //         },
    //         {
    //             "path": "header/actions",
    //             "loadChildren": () => import('./theme/pages/default/header/header-actions/header-actions.module').then(m => m.HeaderActionsModule)
    //         },
    //         {
    //             "path": "header/profile",
    //             "loadChildren": () => import('./theme/pages/default/header/header-profile/header-profile.module').then(m => m.HeaderProfileModule)
    //         },
    //         {
    //             "path": "404",
    //             "loadChildren": () => import('./theme/pages/default/not-found/not-found.module').then(m => m.NotFoundModule)
    //         },
    //         {
    //             "path": "",
    //             "redirectTo": "index",
    //             "pathMatch": "full"
    //         }
    //     ]
    // },
    // {
    //     "path": "snippets/pages/user/login-1",
    //     "loadChildren": () => import('./theme/pages/self-layout-blank/snippets/pages/user/user-login-1/user-login-1.module').then(m => m.UserLogin1Module)
    // },
    // {
    //     "path": "snippets/pages/user/login-2",
    //     "loadChildren": () => import('./theme/pages/self-layout-blank/snippets/pages/user/user-login-2/user-login-2.module').then(m => m.UserLogin2Module)
    // },
    // {
    //     "path": "snippets/pages/user/login-3",
    //     "loadChildren": () => import('./theme/pages/self-layout-blank/snippets/pages/user/user-login-3/user-login-3.module').then(m => m.UserLogin3Module)
    // },
    // {
    //     "path": "snippets/pages/user/login-4",
    //     "loadChildren": () => import('./theme/pages/self-layout-blank/snippets/pages/user/user-login-4/user-login-4.module').then(m => m.UserLogin4Module)
    // },
    // {
    //     "path": "snippets/pages/user/login-5",
    //     "loadChildren": () => import('./theme/pages/self-layout-blank/snippets/pages/user/user-login-5/user-login-5.module').then(m => m.UserLogin5Module)
    // },
    // {
    //     "path": "snippets/pages/user/login-6",
    //     "loadChildren": () => import('./theme/pages/self-layout-blank/snippets/pages/user/user-login-6/user-login-6.module').then(m => m.UserLogin6Module)
    // },
    // {
    //     "path": "snippets/pages/errors/error-1",
    //     "loadChildren": () => import('./theme/pages/self-layout-blank/snippets/pages/errors/errors-error-1/errors-error-1.module').then(m => m.ErrorsError1Module)
    // },
    // {
    //     "path": "snippets/pages/errors/error-2",
    //     "loadChildren": () => import('./theme/pages/self-layout-blank/snippets/pages/errors/errors-error-2/errors-error-2.module').then(m => m.ErrorsError2Module)
    // },
    // {
    //     "path": "snippets/pages/errors/error-3",
    //     "loadChildren": () => import('./theme/pages/self-layout-blank/snippets/pages/errors/errors-error-3/errors-error-3.module').then(m => m.ErrorsError3Module)
    // },
    // {
    //     "path": "snippets/pages/errors/error-4",
    //     "loadChildren": () => import('./theme/pages/self-layout-blank/snippets/pages/errors/errors-error-4/errors-error-4.module').then(m => m.ErrorsError4Module)
    // },
    // {
    //     "path": "snippets/pages/errors/error-5",
    //     "loadChildren": () => import('./theme/pages/self-layout-blank/snippets/pages/errors/errors-error-5/errors-error-5.module').then(m => m.ErrorsError5Module)
    // },
    // {
    //     "path": "snippets/pages/errors/error-6",
    //     "loadChildren": () => import('./theme/pages/self-layout-blank/snippets/pages/errors/errors-error-6/errors-error-6.module').then(m => m.ErrorsError6Module)
    // },
    // {
    //     "path": "**",
    //     "redirectTo": "404",
    //     "pathMatch": "full"
    // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash:true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }