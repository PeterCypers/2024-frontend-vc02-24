import { Box } from '@mui/system';
import { Container} from '@mui/material';
// import BestellingList from '../components/BestellingList';
import { grey } from '@mui/material/colors';

export default function BestellingPage() {
    return (
            <Box sx={{ 
              width: "100%",
              height: "100%",
              borderRadius: 1,
              backgroundColor: grey[400]
              }}>
                {/* <BestellingList/> */}
            </Box>
    );
}
