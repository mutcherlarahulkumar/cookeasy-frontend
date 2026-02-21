import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CommunityIcon from "@mui/icons-material/People";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BubbleCursor from "@cookeasy/lib/components/CustomCursor";

const features = [
  {
    title: "Discover Recipes",
    desc: "Explore mouthwatering recipes from around the world.",
    icon: <RestaurantMenuIcon color="primary" />,
  },
  {
    title: "Share Your Art",
    desc: "Share your favorite recipes with the community.",
    icon: <AutoAwesomeIcon color="secondary" />,
  },
  {
    title: "Join Community",
    desc: "Connect with fellow food enthusiasts.",
    icon: <CommunityIcon color="primary" />,
  },
  // ... add more as needed
];

export default function HomePage() {
  return (
    <Box>
      {" "}
      {/* Hide default cursor */}
      <BubbleCursor />
      <Box>
        {/* HERO SECTION */}
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            pt: 12,
            pb: 10,
            textAlign: "center",
            borderRadius: "0 0 50px 50px", // Subtle curve
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h2" fontWeight="800" gutterBottom>
              Cook Easy, Eat Better.
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
              Join the world’s most passionate community of home chefs and
              professional foodies.
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ borderRadius: 8, px: 4 }}
              >
                Explore Recipes
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                sx={{ borderRadius: 8, px: 4 }}
              >
                Share a Recipe
              </Button>
            </Stack>
          </Container>
        </Box>

        {/* FEATURES GRID */}
        <Container sx={{ mt: -5, mb: 10 }}>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card
                  sx={{
                    height: "180px",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 4,
                    transition: "transform 0.2s",
                    "&:hover": { transform: "translateY(-8px)", boxShadow: 6 },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 4 }}>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      fontWeight="700"
                    >
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
