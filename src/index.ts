import "./sidebar";
import "./sketch";
import "./style.scss";

// File used for global declaration

declare global {
    interface Window {
        openSidebar: Function,
        closeSidebar: Function,
        saveCanvas: Function,
        windowResized: Function,
    }
}