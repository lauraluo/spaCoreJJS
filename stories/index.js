import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import DialogDemo  from '../src/script/components/dialog/DialogDemo';
import Dialog, {DialogActions} from '../src/script//components/dialog/Dialog';
import RefluxMock from '../src/script/core/RefluxMockProvider';
import '../src/scss/site.scss';

var DialogDefault = RefluxMock( Dialog, DialogActions, "showDialog", {
      title: "Dialog標題",
      content: "test",
      didOpened: function(){console.log("open")},
      buttons:  [
          {
              text: "取消",
              callback: function(){console.log("click 取消")}
          },
          {
              text: "送出鈕",
              callback: function(){console.log("click 送出鈕")}
          }
      ]}
    );

storiesOf('Dialog', module)
  .add('DialogDefault', () => (<DialogDefault/>));