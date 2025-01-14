import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Avatar,
  Badge,
  Divider,
} from "@mui/material";
import { Login, Logout, Person } from "@mui/icons-material";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAuth } from "../contexts/Auth.context";
import { getAll } from "../api/index";
import { red } from "@mui/material/colors";
import useSWR from "swr";

const fetcher = (url) => getAll(url);

const Navbar = () => {
  const { isAuthed, gebruikerLetter } = useAuth();
  const [profielAnchorEl, setAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const navigate = useNavigate();
  const openProfielMenu = Boolean(profielAnchorEl);
  const openNotifMenu = Boolean(notifAnchorEl);

  const {
    data: notificaties = { items: [] },
    error,
    isLoading
  } = useSWR(isAuthed ? "notificaties" : null, fetcher, { revalidateOnMount: true });

  const ongelezenNotificatiesCount = useMemo(() => {
    if (isLoading) {
      return 0;
    }

    return notificaties.items.filter(n => n.NOTIFICATIESTATUS !== 'gelezen').length;
  }, [notificaties]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotifClick = (event) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleNotifClose = () => {
    setNotifAnchorEl(null);
  };

  const handleNotificationSelect = (notif) => {
    handleNotifClose();
    navigate(`/profiel/bestellingen/${notif.ORDERID}`);
  };

  function letterAvatar(letter) {
    return {
      children: `${letter}`,
    };
  }

  return (
    <nav className="border-b-2 border-gray-100">
      <ul className="flex justify-between">
        <li>
          <img
            className="h-14"
            src="/images/Delaware-logo.png"
            alt="Delaware logo"
          />
        </li>
        <ul className="flex">
          <li className={ongelezenNotificatiesCount ? "items-end mt-3" : "items-end mt-1"}>
            {isAuthed ? (
              <IconButton onClick={handleNotifClick}>
                {
                  ongelezenNotificatiesCount ?
                    <Badge
                      badgeContent={ongelezenNotificatiesCount}
                      color="error"
                    >
                      <NotificationsIcon
                        fontSize="large"
                        style={{ color: red[500] }}
                      />
                    </Badge>
                    :
                    <NotificationsIcon
                      fontSize="large"
                      style={{ color: red[500] }}
                    />
                }
              </IconButton>
            ) : (
              <></>
            )}
            <Menu
              anchorEl={notifAnchorEl}
              open={openNotifMenu}
              onClose={handleNotifClose}
              PaperProps={{
                elevation: 1,
                sx: {
                  minWidth: 250,
                  maxWidth: 350,
                  overflow: "auto",
                  "& .MuiMenuItem-root": {
                    minHeight: 48,
                    borderBottom: "1px solid #e0e0e0",
                    "&:hover": {
                      backgroundColor: "rgba(255, 0, 0, 0.1)",
                      boxShadow: "0 0 10px rgba(255, 0, 0, 0.5)",
                    },
                    "&:last-child": {
                      borderBottom: "none",
                    },
                  },
                },
              }}
            >
              {notificaties.items.slice(0, 5).map((notif) => (
                <MenuItem
                  key={notif.NOTIFICATIEID}
                  onClick={() => handleNotificationSelect(notif)}
                >
                  {notif.BERICHT || "Geen bericht beschikbaar"}
                </MenuItem>
              ))}
              <MenuItem
                key="notificaties"
                onClick={() => navigate("/profiel/notificaties")}
                style={{ color: red[500] }}
              >
                Alle notificaties bekijken
              </MenuItem>
            </Menu>
          </li>
          <li>
            <IconButton
              disableRipple={true}
              onClick={handleClick}
              aria-controls={openProfielMenu ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openProfielMenu ? "true" : undefined}
            >
              {isAuthed && gebruikerLetter ? (
                <Avatar
                  {...letterAvatar(gebruikerLetter)}
                  sx={{ bgcolor: red[600], width: 40, height: 40 }}
                />
              ) : (
                <Avatar sx={{ bgcolor: red[600], width: 40, height: 40 }} />
              )}
            </IconButton>
            <Menu
              anchorEl={profielAnchorEl}
              id="account-menu"
              open={openProfielMenu}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {isAuthed ? (
                <div>
                  <MenuItem>
                    <Link to="/profiel/gebruikergegevens">
                      <ListItemIcon>
                        <Person fontSize="small" />
                      </ListItemIcon>
                      Accountoverzicht
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/">
                      <ListItemIcon>
                        <WarehouseIcon fontSize="small" />
                      </ListItemIcon>
                      Producten
                    </Link>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <Link to="/logout?manueel=true">
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Uitloggen
                    </Link>
                  </MenuItem>
                </div>
              ) : (
                <MenuItem>
                  <Link to="/login">
                    <ListItemIcon>
                      <Login fontSize="small" />
                    </ListItemIcon>
                    Inloggen
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </li>
        </ul>
      </ul>
    </nav >
  );
};

export default Navbar;
