import React from "react";
import { Link } from "react-router-dom";
import { Box, ListItemIcon, ListItemText, MenuItem, MenuList, styled } from "@mui/material";
import { Badge as BaseBadge, badgeClasses } from "@mui/base/Badge";
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import InventoryIcon from "@mui/icons-material/Inventory";
import NoteIcon from "@mui/icons-material/Note";
import { red } from "@mui/material/colors";

const Badge = styled(BaseBadge)(
  ({ theme }) => `
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 12px;
  font-variant: tabular-nums;
  list-style: none;
  font-family: 'IBM Plex Sans', sans-serif;
  position: relative;
  display: inline-block;
  line-height: 1;

  & .${badgeClasses.badge} {
    z-index: auto;
    position: absolute;
    top: 0;
    right: 0;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    color: #fff;
    font-weight: 600;
    font-size: 10px;
    line-height: 20px;
    white-space: nowrap;
    text-align: center;
    border-radius: 10px;
    background: ${red[500]};
    box-shadow: 0px 2px 24px ${
      theme.palette.mode === "dark" ? red[900] : red[100]
    };
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }
  `
);

const SideMenu = React.memo(({ ongelezenNotificatiesCount }) => {
  return (
    <Box className="w-56 max-w-full h-full overflow-auto rounded">
      <MenuList>
        <Link to="gebruikergegevens">
          <MenuItem>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Gegevens</ListItemText>
          </MenuItem>
        </Link>
        <Link to="bedrijfsgegevens">
          <MenuItem>
            <ListItemIcon>
              <ApartmentIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Bedrijfs gegevens</ListItemText>
          </MenuItem>
        </Link>
        <Link to="bestellingen">
          <MenuItem>
            <ListItemIcon>
              <InventoryIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Bestellingen</ListItemText>
          </MenuItem>
        </Link>
        <Link to="notificaties">
          <MenuItem>
            <ListItemIcon>
              {
                ongelezenNotificatiesCount != 0 ?
                  <Badge badgeContent={ongelezenNotificatiesCount} showZero>
                    <NoteIcon fontSize="small" />
                  </Badge>
                  :
                  <NoteIcon fontSize="small" />
              }
            </ListItemIcon>
            <ListItemText>Notificaties</ListItemText>
          </MenuItem>
        </Link>
      </MenuList>
    </Box>
  );
});

export default SideMenu;