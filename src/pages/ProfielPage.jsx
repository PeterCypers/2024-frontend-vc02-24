import { styled, Box } from "@mui/system";
import { Badge as BaseBadge, badgeClasses } from "@mui/base/Badge";
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from "@mui/icons-material/Inventory";
import PaymentIcon from "@mui/icons-material/Payment";
import NoteIcon from "@mui/icons-material/Note";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { red } from "@mui/material/colors";
import { Link, Outlet } from "react-router-dom";

export default function ProfielPage() {
  const imageURL = "/images/backgroundTitle.png";
  return (
    <div className="w-full">
      <Box
        sx={{
          backgroundImage: `url(${imageURL})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          p: 5,
          my: 2,
          width: '100%',
        }} id="profiel-title"
      >
          <h1 id="h1">Accountoverzicht</h1>
      </Box>
      <div className="px-4 flex flex-grow w-full h-screen space-x-4" id="profiel-container">
        <div className="h-full w-fit mt-10 mr-10">
          <SideMenu />
        </div>
        <div className="h-full w-full mt-10 rounded-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

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

function SideMenu() {
  return (
    <Box className="w-56 max-w-full h-full overflow-auto rounded">
      <MenuList>
        <Link to="gegevens">
          <MenuItem>
           <ListItemIcon>
             <PersonIcon fontSize="small" />
           </ListItemIcon>
           <ListItemText>Gegevens</ListItemText>
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
        <Link>
          <MenuItem>
            <ListItemIcon>
              <Badge badgeContent={2} showZero>
                <NoteIcon fontSize="small" />
              </Badge>
            </ListItemIcon>
            <ListItemText>Notificaties</ListItemText>
          </MenuItem>
        </Link>
        <Link>
          <MenuItem>
            <ListItemIcon>
              <PaymentIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Betalingen</ListItemText>
          </MenuItem>
        </Link>
        <Link>
          <MenuItem>
            <ListItemIcon>
              <QuestionAnswerIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Chat-geschiedenis</ListItemText>
          </MenuItem>
        </Link>
      </MenuList>
    </Box>
  );
}
