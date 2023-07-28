import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  IStatusBar
} from '@jupyterlab/statusbar';

import { Widget } from '@lumino/widgets';

class ShoutStatusBarSummary extends Widget {

  statusBarSummary: HTMLElement;

  constructor() {
    super();

    this.statusBarSummary = document.createElement('p');
    this.statusBarSummary.innerText = 'Last Shout: (None)';
    this.node.appendChild(this.statusBarSummary);
  }

  setSummary(summary: string) {
    this.statusBarSummary.innerText = summary;
  }
}

class ShoutWidget extends Widget {

  shoutButton: HTMLElement;
  lastShoutTime: Date | null;
  shoutSummary: HTMLElement;
  statusBarWidget: ShoutStatusBarSummary | null;

  constructor(statusBar: any) {
    super();

    const shoutButton = document.createElement('div');
    shoutButton.innerText = 'Press to Shout';
    shoutButton.addEventListener('click', this.shout.bind(this));
    shoutButton.classList.add('jp-shout-button');
    this.node.appendChild(shoutButton);
    this.shoutButton = shoutButton;

    this.lastShoutTime = null;
    this.shoutSummary = document.createElement('p');

    this.statusBarWidget = null;
    if (statusBar) {
      console.log('SHOUT: Found jup status bar')
      this.statusBarWidget = new ShoutStatusBarSummary();
      statusBar.registerStatusItem('shoutStatusBarSummary', {item: this.statusBarWidget});
    }
  }

  shout() {
    this.lastShoutTime = new Date();
    const message: string = 'Shouting at ' + this.lastShoutTime;
    window.alert(message);

    if (this.statusBarWidget) {
      this.statusBarWidget.setSummary('Last Shout: ' + this.lastShoutTime.toString());
    }
  }
}

/**
 * Initialization data for the shout_button_message extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'shout_button_message:plugin',
  description: 'An extension that adds a button and message to the right toolbar, with optional status bar widget in JupyterLab.',
  autoStart: true,
  optional: [IStatusBar],
  activate: (app: JupyterFrontEnd, statusBar: IStatusBar | null) => {
    console.log('JupyterLab extension shout_button_message is activated!');

    const shoutWidget: ShoutWidget = new ShoutWidget(statusBar);
    shoutWidget.id = 'JupyterShoutWidget';
    app.shell.add(shoutWidget, 'right');
  }
};

export default plugin;
