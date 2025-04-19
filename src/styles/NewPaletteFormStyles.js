import { DRAWER_WIDTH } from "../constants";
const drawerWidth = DRAWER_WIDTH;
const PREFIX = 'NewPaletteForm';

export default {
    [`&.${PREFIX}-root`]: {
        display: "flex"
    },
    [`& .${PREFIX}-hide`]: {
        display: "none"
    },
    [`& .${PREFIX}-drawer`]: {
        width: drawerWidth,
        flexShrink: 0,
        height: "100vh"
    },
    [`& .${PREFIX}-drawerPaper`]: {
        width: drawerWidth,
        display: "flex",
        alignItems: "center"
    },
    [`& .${PREFIX}-drawerHeader`]: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "0 8px",
        minHeight: "64px", // Equivalent to theme.mixins.toolbar
        justifyContent: "flex-end"
    },
    [`& .${PREFIX}-content`]: {
        flexGrow: 1,
        height: "calc(100vh - 64px)",
        padding: 0,
        transition: "margin 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
        marginLeft: -drawerWidth
    },
    [`& .${PREFIX}-contentShift`]: {
        transition: "margin 195ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
        marginLeft: 0
    },
    [`& .${PREFIX}-container`]: {
        width: "90%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    [`& .${PREFIX}-buttons`]: {
        width: "100%"
    },
    [`& .${PREFIX}-button`]: {
        width: "50%"
    }
};