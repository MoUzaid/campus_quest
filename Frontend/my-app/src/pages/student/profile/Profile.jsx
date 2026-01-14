// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Card,
//   Typography,
//   Grid,
//   Button,
//   Avatar,
//   Divider,
//   CircularProgress,
//   Paper
// } from "@mui/material";

// import PersonIcon from "@mui/icons-material/Person";
// import LogoutIcon from "@mui/icons-material/Logout";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import LockResetIcon from "@mui/icons-material/LockReset";
// import EmailIcon from "@mui/icons-material/Email";
// import SchoolIcon from "@mui/icons-material/School";
// import NumbersIcon from "@mui/icons-material/Numbers";
// import ApartmentIcon from "@mui/icons-material/Apartment";
// import GroupsIcon from "@mui/icons-material/Groups";

// const StudentProfile = () => {
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/students/me", {
//           credentials: "include",
//         });

//         if (res.status === 401 || res.status === 403) {
//           navigate("/student/login");
//           return;
//         }

//         const data = await res.json();
//         setStudent(data);
//         localStorage.setItem("studentId", data.id);
//       } catch (err) {
//         console.error("Profile fetch failed:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [navigate]);

//   const handleLogout = async () => {
//     await fetch("http://localhost:5000/students/logout", {
//       method: "POST",
//       credentials: "include",
//     });
//     localStorage.removeItem("studentId");
//     navigate("/student/login");
//   };

//   if (loading)
//     return (
//       <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
//         <CircularProgress />
//       </Box>
//     );

//   if (!student)
//     return (
//       <Box textAlign="center" pt={10}>
//         <Typography color="error">No student data found</Typography>
//       </Box>
//     );

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         p: 3,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "flex-start",
//         background: "linear-gradient(to bottom right, #e3f2fd, #ffffff)",
//       }}
//     >
//       <Card
//         sx={{
//           width: "100%",
//           maxWidth: "900px",
//           p: { xs: 2, sm: 3, md: 4 },
//           borderRadius: 4,
//           backdropFilter: "blur(10px)",
//           background: "rgba(255,255,255,0.8)",
//           boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
//         }}
//       >
        
//         {/* Header */}
//         <Box
//           display="flex"
//           alignItems="center"
//           gap={2}
//           mb={3}
//           flexWrap="wrap"
//         >
//           <Avatar
//             sx={{
//               width: { xs: 60, sm: 70, md: 80 },
//               height: { xs: 60, sm: 70, md: 80 },
//               bgcolor: "#1976D2",
//             }}
//           >
//             <PersonIcon sx={{ fontSize: { xs: 30, sm: 35, md: 45 } }} />
//           </Avatar>

//           <Box>
//             <Typography
//               sx={{
//                 fontSize: { xs: "18px", sm: "20px", md: "24px" },
//                 fontWeight: 700,
//                 lineHeight: 1.1,
//               }}
//             >
//               {student.name}
//             </Typography>
//             <Typography
//               variant="body2"
//               sx={{ fontSize: { xs: "12px", sm: "14px" }, color: "text.secondary" }}
//             >
//               Student Profile • Portal
//             </Typography>
//           </Box>
//         </Box>

//         <Divider sx={{ my: { xs: 2, sm: 3 } }} />

//         {/* Profile Details Grid */}
//         <Grid container spacing={2}>
//           <ProfileItem label="Email" value={student.email} icon={<EmailIcon />} />
//           <ProfileItem label="Enrollment No" value={student.studentId} icon={<NumbersIcon />} />
//           <ProfileItem label="Department" value={student.department} icon={<ApartmentIcon />} />
//           <ProfileItem label="Course" value={student.course} icon={<SchoolIcon />} />
//           <ProfileItem label="Semester" value={student.semester} icon={<SchoolIcon />} />
//           <ProfileItem label="Group" value={student.group} icon={<GroupsIcon />} />
//         </Grid>

//         <Divider sx={{ my: { xs: 2, sm: 3 } }} />

//         {/* Buttons */}
//         <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
//           <Button
//             fullWidth
//             variant="outlined"
//             startIcon={<ArrowBackIcon />}
//             onClick={() => navigate("/student/dashboard")}
//           >
//             Dashboard
//           </Button>

//           <Button
//             fullWidth
//             variant="contained"
//             startIcon={<LockResetIcon />}
//             onClick={() => navigate("/student/change-password")}
//           >
//             Change Password
//           </Button>

//           <Button
//             fullWidth
//             variant="contained"
//             color="error"
//             startIcon={<LogoutIcon />}
//             onClick={handleLogout}
//           >
//             Logout
//           </Button>
//         </Box>
//       </Card>
//     </Box>
//   );
// };

// const ProfileItem = ({ label, value, icon }) => (
//   <Grid item xs={12} sm={6}>
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 1.5, sm: 2 },
//         display: "flex",
//         alignItems: "center",
//         gap: { xs: 1.2, sm: 2 },
//         borderRadius: 2,
//         border: "1px solid #e0e0e0",
//         background: "#fafafa",
//       }}
//     >
//       <Box sx={{ fontSize: { xs: "18px", sm: "20px" } }}>
//         {icon}
//       </Box>
//       <Box>
//         <Typography
//           variant="caption"
//           sx={{
//             color: "text.secondary",
//             fontSize: { xs: "10px", sm: "12px" },
//           }}
//         >
//           {label}
//         </Typography>
//         <Typography
//           sx={{
//             fontSize: { xs: "13px", sm: "15px" },
//             fontWeight: 600,
//           }}
//         >
//           {value || "—"}
//         </Typography>
//       </Box>
//     </Paper>
//   </Grid>
// );

// export default StudentProfile;






import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  Avatar,
  Divider,
  CircularProgress,
  Paper,
  useTheme,
  useMediaQuery,
  Chip,
  Stack,
  alpha
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockResetIcon from "@mui/icons-material/LockReset";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import NumbersIcon from "@mui/icons-material/Numbers";
import ApartmentIcon from "@mui/icons-material/Apartment";
import GroupsIcon from "@mui/icons-material/Groups";
import VerifiedIcon from "@mui/icons-material/Verified";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(700));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down(400));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/students/me", {
          credentials: "include",
        });

        if (res.status === 401 || res.status === 403) {
          navigate("/student/login");
          return;
        }

        const data = await res.json();
        setStudent(data);
        localStorage.setItem("studentId", data.id);
      } catch (err) {
        console.error("Profile fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/students/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("studentId");
    navigate("/student/login");
  };

  if (loading)
    return (
      <Box 
        minHeight="100vh" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        sx={{
          background: isMobile 
            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
            : "linear-gradient(to bottom right, #e3f2fd, #ffffff)"
        }}
      >
        <CircularProgress sx={{ color: isMobile ? "white" : "primary.main" }} />
      </Box>
    );

  if (!student)
    return (
      <Box textAlign="center" pt={10}>
        <Typography color="error">No student data found</Typography>
      </Box>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: isMobile ? 1.5 : 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: isMobile 
          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
          : "linear-gradient(to bottom right, #e3f2fd, #ffffff)",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: isMobile ? "100%" : "900px",
          p: isMobile ? 2 : { xs: 2, sm: 3, md: 4 },
          borderRadius: isMobile ? 3 : 4,
          backdropFilter: "blur(10px)",
          background: isMobile 
            ? "rgba(255,255,255,0.95)" 
            : "rgba(255,255,255,0.8)",
          boxShadow: isMobile 
            ? "0 8px 32px rgba(0,0,0,0.1)" 
            : "0 20px 50px rgba(0,0,0,0.08)",
          border: isMobile ? "1px solid rgba(255,255,255,0.2)" : "none",
        }}
      >
        {/* Mobile-only header gradient bar */}
        {isMobile && (
          <Box
            sx={{
              height: 4,
              background: "linear-gradient(90deg, #667eea, #764ba2)",
              borderRadius: 2,
              mb: 3,
              mx: -2,
              mt: -2
            }}
          />
        )}
        
        {/* Header */}
        <Box
          display="flex"
          alignItems="center"
          gap={isMobile ? 1.5 : 2}
          mb={isMobile ? 2 : 3}
          flexWrap="wrap"
          sx={{
            position: "relative"
          }}
        >
          <Avatar
            sx={{
              width: isMobile ? 56 : { xs: 60, sm: 70, md: 80 },
              height: isMobile ? 56 : { xs: 60, sm: 70, md: 80 },
              bgcolor: isMobile ? "#667eea" : "#1976D2",
              border: isMobile ? "3px solid #764ba2" : "none",
              boxShadow: isMobile ? "0 4px 12px rgba(102, 126, 234, 0.3)" : "none"
            }}
          >
            <PersonIcon sx={{ fontSize: isMobile ? 28 : { xs: 30, sm: 35, md: 45 } }} />
          </Avatar>

          <Box sx={{ flex: 1, minWidth: isSmallMobile ? "100%" : "auto" }}>
            <Typography
              sx={{
                fontSize: isMobile ? "16px" : { xs: "18px", sm: "20px", md: "24px" },
                fontWeight: 700,
                lineHeight: 1.2,
                mb: 0.5
              }}
            >
              {student.name}
            </Typography>
            
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
              <Chip
                icon={<VerifiedIcon />}
                label="Verified"
                size="small"
                sx={{
                  height: isMobile ? 20 : 24,
                  fontSize: isMobile ? "10px" : "12px",
                  bgcolor: alpha("#4caf50", 0.1),
                  color: "#2e7d32"
                }}
              />
              <Typography
                variant="body2"
                sx={{ 
                  fontSize: isMobile ? "11px" : { xs: "12px", sm: "14px" }, 
                  color: "text.secondary" 
                }}
              >
                Student • {student.department}
              </Typography>
            </Box>
          </Box>

          {/* Mobile-only quick actions */}
          {isMobile && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/student/dashboard")}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                minWidth: "auto",
                px: 1,
                py: 0.5,
                fontSize: "12px"
              }}
            >
              Back
            </Button>
          )}
        </Box>

        <Divider sx={{ 
          my: isMobile ? 2 : { xs: 2, sm: 3 },
          borderColor: isMobile ? alpha("#000", 0.08) : undefined 
        }} />

        {/* Profile Details Grid */}
        <Grid container spacing={isMobile ? 1.5 : 2}>
          <ProfileItem 
            label="Email" 
            value={student.email} 
            icon={<EmailIcon />} 
            isMobile={isMobile}
            isSmallMobile={isSmallMobile}
          />
          <ProfileItem 
            label="Enrollment No" 
            value={student.studentId} 
            icon={<NumbersIcon />} 
            isMobile={isMobile}
            isSmallMobile={isSmallMobile}
            accent
          />
          <ProfileItem 
            label="Department" 
            value={student.department} 
            icon={<ApartmentIcon />} 
            isMobile={isMobile}
            isSmallMobile={isSmallMobile}
          />
          <ProfileItem 
            label="Course" 
            value={student.course} 
            icon={<SchoolIcon />} 
            isMobile={isMobile}
            isSmallMobile={isSmallMobile}
          />
          <ProfileItem 
            label="Semester" 
            value={student.semester} 
            icon={<SchoolIcon />} 
            isMobile={isMobile}
            isSmallMobile={isSmallMobile}
          />
          <ProfileItem 
            label="Group" 
            value={student.group} 
            icon={<GroupsIcon />} 
            isMobile={isMobile}
            isSmallMobile={isSmallMobile}
            accent
          />
        </Grid>

        {/* Mobile-only additional info */}
        {isMobile && (
          <Paper
            elevation={0}
            sx={{
              mt: 2,
              p: 2,
              borderRadius: 2,
              background: alpha("#667eea", 0.05),
              border: `1px solid ${alpha("#667eea", 0.1)}`
            }}
          >
            <Typography
              variant="caption"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "text.secondary",
                mb: 1
              }}
            >
              <PhoneAndroidIcon fontSize="small" />
              Student ID
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#667eea"
              }}
            >
              {student.id || "STU-" + Math.random().toString(36).substr(2, 9).toUpperCase()}
            </Typography>
          </Paper>
        )}

        <Divider sx={{ 
          my: isMobile ? 2 : { xs: 2, sm: 3 },
          borderColor: isMobile ? alpha("#000", 0.08) : undefined 
        }} />

        {/* Buttons - Different layout for mobile */}
        {isMobile ? (
          <Stack spacing={1.5}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<LockResetIcon />}
              onClick={() => navigate("/student/change-password")}
              sx={{
                py: 1.5,
                borderRadius: 2,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                fontSize: "14px"
              }}
            >
              Change Password
            </Button>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/student/dashboard")}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: "13px"
                }}
              >
                Dashboard
              </Button>

              <Button
                fullWidth
                variant="outlined"
                color="error"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: "13px"
                }}
              >
                Logout
              </Button>
            </Box>
          </Stack>
        ) : (
          <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/student/dashboard")}
            >
              Dashboard
            </Button>

            <Button
              fullWidth
              variant="contained"
              startIcon={<LockResetIcon />}
              onClick={() => navigate("/student/change-password")}
            >
              Change Password
            </Button>

            <Button
              fullWidth
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        )}
      </Card>
    </Box>
  );
};

const ProfileItem = ({ label, value, icon, isMobile, isSmallMobile, accent }) => (
  <Grid item xs={12} sm={6}>
    <Paper
      elevation={0}
      sx={{
        p: isMobile ? 1.5 : { xs: 1.5, sm: 2 },
        display: "flex",
        alignItems: "center",
        gap: isMobile ? 1.2 : { xs: 1.2, sm: 2 },
        borderRadius: isMobile ? 2 : 2,
        border: `1px solid ${accent ? alpha("#667eea", 0.2) : "#e0e0e0"}`,
        background: accent ? alpha("#667eea", 0.03) : "#fafafa",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: isMobile ? "translateY(-2px)" : "none",
          boxShadow: isMobile ? "0 4px 12px rgba(0,0,0,0.08)" : "none",
          borderColor: isMobile ? "#667eea" : undefined
        }
      }}
    >
      <Box 
        sx={{ 
          fontSize: isMobile ? "18px" : { xs: "18px", sm: "20px" },
          color: accent ? "#667eea" : "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: isMobile ? 32 : 36,
          minHeight: isMobile ? 32 : 36,
          borderRadius: 1.5,
          background: accent ? alpha("#667eea", 0.1) : alpha("#1976D2", 0.08)
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontSize: isMobile ? "10px" : { xs: "10px", sm: "12px" },
            display: "block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontSize: isMobile ? "13px" : { xs: "13px", sm: "15px" },
            fontWeight: 600,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: isSmallMobile ? 1 : 2,
            WebkitBoxOrient: "vertical",
            lineHeight: 1.3
          }}
        >
          {value || "—"}
        </Typography>
      </Box>
    </Paper>
  </Grid>
);

export default StudentProfile;