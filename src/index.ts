import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the shout_button_message extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'shout_button_message:plugin',
  description: 'An extension that adds a button and message to the right toolbar, with optional status bar widget in JupyterLab.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension shout_button_message is activated!');
  }
};

export default plugin;
