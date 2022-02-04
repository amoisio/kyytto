import { Plugin } from 'vue'
import KButtonCancel from './k-button-cancel.vue';
import KButtonComplete from './k-button-complete.vue';
import KButtonDanger from './k-button-danger.vue';
import KButtonEdit from './k-button-edit.vue';
import KButtonNew from './k-button-new.vue';
import KButtonPin from './k-button-pin.vue';
import KButtonRemove from './k-button-remove.vue';
import KButtonSave from './k-button-save.vue';
import KButtonStart from './k-button-start.vue';
import KButtonStop from './k-button-stop.vue';
import KButtonSuccess from './k-button-success.vue';
import KButtonWarning from './k-button-warning.vue';
import KButton from './k-button.vue';
import KTag from './k-tag.vue';
import KPageHeader from './k-page-header.vue';
import KSectionHeader from './k-section-header.vue';
import KTagList from './k-tag-list.vue';

const KComponents: Plugin = (app, options) => {
  app.component('k-button-cancel', KButtonCancel);
  app.component('k-button-complete', KButtonComplete);
  app.component('k-button-danger', KButtonDanger);
  app.component('k-button-edit', KButtonEdit);
  app.component('k-button-new', KButtonNew);
  app.component('k-button-pin', KButtonPin);
  app.component('k-button-remove', KButtonRemove);
  app.component('k-button-save', KButtonSave);
  app.component('k-button-start', KButtonStart);
  app.component('k-button-stop', KButtonStop);
  app.component('k-button-success', KButtonSuccess);
  app.component('k-button-warning', KButtonWarning);
  app.component('k-button', KButton);
  app.component('k-tag', KTag)
  app.component('k-page-header', KPageHeader);
  app.component('k-section-header', KSectionHeader);
  app.component('k-tag-list', KTagList);
};

export default KComponents;