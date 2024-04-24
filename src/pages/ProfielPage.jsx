import { styled, Box } from "@mui/system";
import { Badge as BaseBadge, badgeClasses } from "@mui/base/Badge";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Container,
  Typography,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import PaymentIcon from "@mui/icons-material/Payment";
import NoteIcon from "@mui/icons-material/Note";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { red, grey } from "@mui/material/colors";
import BestellingenPage from "./BestellingenPage";
import { Link, Outlet } from "react-router-dom";

export default function ProfielPage() {
  const imageURL = "/public/images/backgroundTitle.png";
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          backgroundImage: `url(${imageURL})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          p: 3,
          marginBottom: 3,
          marginTop: 3,
        }}
      >
          <h1 id="h1">Accountoverzicht</h1>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{ height: "100%", width: "100%" }}
      >
        <Grid xs={2} height={"100%"}>
          <SideMenu />
        </Grid>
        <Grid xs height={"100%"}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
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
    <Box
      sx={{
        width: 250,
        maxWidth: "100%",
        height: "100%",
        overflow: "auto",
        borderRadius: 1,
        backgroundColor: grey[400],
      }}
    >
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <InventoryIcon fontSize="small" />
          </ListItemIcon>
          <Link to="bestellingen">
            <ListItemText>Bestellingen</ListItemText>
          </Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <PaymentIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Betalingen</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Badge badgeContent={2} showZero>
              <NoteIcon fontSize="small" />
            </Badge>
          </ListItemIcon>
          <ListItemText>Notificaties</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ManageAccountsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Gegevens</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <QuestionAnswerIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Chat-geschiedenis</ListItemText>
        </MenuItem>
      </MenuList>
    </Box>
  );
}
