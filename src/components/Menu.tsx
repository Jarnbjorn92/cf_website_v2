import React from "react";
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  ListItemSecondaryAction,
  useTheme,
  alpha,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import MailIcon from "@mui/icons-material/Mail";

interface MenuProps {
  darkMode: boolean;
  onThemeToggle: () => void;
  onNavigate: (section: string) => void;
}

const Menu: React.FC<MenuProps> = ({ darkMode, onThemeToggle, onNavigate }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const theme = useTheme();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsOpen(open);
    };

  const handleNavigation = (section: string) => {
    onNavigate(section);
    setIsOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          position: "fixed",
          top: "30px",
          right: "30px",
          zIndex: 1000,
          color: (theme) => theme.palette.text.primary,
          background: (theme) => alpha(theme.palette.background.paper, 0.1),
          backdropFilter: "blur(10px)",
          "&:hover": {
            background: (theme) => alpha(theme.palette.background.paper, 0.2),
          },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(145deg, rgba(26, 26, 26, 0.9), rgba(30, 30, 30, 0.9))"
                : "linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(250, 250, 250, 0.9))",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <List>
          <ListItem>
            <ListItemIcon>
              <DarkModeIcon />
            </ListItemIcon>
            <ListItemText primary="Dark Mode" />
            <ListItemSecondaryAction>
              <Switch edge="end" checked={darkMode} onChange={onThemeToggle} />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button onClick={() => handleNavigation("about")}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation("portfolio")}>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Portfolio" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation("contact")}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Menu;
