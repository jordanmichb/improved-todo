import './styles.css';

import ScreenController from './screenController.js';
import { loadTaskView } from './pageView.js';

ScreenController.setContentHeight();
ScreenController.setNav();
ScreenController.loadView();

ScreenController.loadProjectList();


