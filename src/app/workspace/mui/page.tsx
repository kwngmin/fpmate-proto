"use client";

import Image from "next/image";
import Header from "../ui/Header";
import Link from "next/link";
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardActionArea,
  Avatar,
  AvatarGroup,
  Chip,
  Switch,
  Select,
  MenuItem,
  Tab,
  Tabs,
  Badge,
  Stack,
  Container,
  Divider,
  SelectChangeEvent,
} from "@mui/material";
import {
  Add as AddIcon,
  AccessTime as ClockIcon,
  Search as SearchIcon,
  ChevronRight as ChevronRightIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";

interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  author: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "첨부파일 테스트",
    category: "서비스 공지사항",
    date: "2025.12.10",
    author: "강경희",
  },
  {
    id: 2,
    title: "신규 테스트",
    category: "서비스 공지사항",
    date: "2025.12.10",
    author: "강경희",
  },
  {
    id: 3,
    title: "새 글 테스트",
    category: "공지사항",
    date: "2025.12.10",
    author: "김광민",
  },
  {
    id: 4,
    title: "라이센스 테스트",
    category: "서비스 공지사항",
    date: "2025.12.10",
    author: "강경희",
  },
  {
    id: 5,
    title: "첨부파일 테스트",
    category: "서비스 공지사항",
    date: "2025.12.10",
    author: "강경희",
  },
  {
    id: 6,
    title: "작업 권한 테스트",
    category: "공지사항",
    date: "2025.12.10",
    author: "백은비",
  },
];

interface ThumbnailProps {
  title: string;
}

const ThumbnailPlus = ({ title }: ThumbnailProps) => (
  <Box
    sx={{
      width: { xs: 56, sm: 64, lg: 80, xl: 112 },
      height: { xs: 56, sm: 64, lg: 80, xl: 112 },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(to top, #d1fae5, #ecfdf5)",
      position: "relative",
      zIndex: 10,
      overflow: "hidden",
      borderRadius: 4,
      transition: "transform 0.5s",
      ".MuiCardActionArea-root:hover &": {
        transform: "scale(1.05)",
      },
    }}
  >
    {/* Abstract Shape Background */}
    <Box
      sx={{
        position: "absolute",
        width: { xs: 48, sm: 56, lg: 64, xl: 96 },
        height: { xs: 48, sm: 56, lg: 64, xl: 96 },
        top: -12,
        left: -12,
        background:
          "linear-gradient(to bottom right, rgba(52, 211, 153, 0.2), rgba(110, 231, 183, 0.2))",
        borderRadius: "50%",
        filter: "blur(24px)",
      }}
    />
    <Box
      sx={{
        position: "absolute",
        width: { xs: 40, sm: 48, lg: 56, xl: 80 },
        height: { xs: 40, sm: 48, lg: 56, xl: 80 },
        bottom: 0,
        right: 0,
        background:
          "linear-gradient(to top left, rgba(52, 211, 153, 0.1), transparent)",
        borderRadius: "50%",
        filter: "blur(16px)",
      }}
    />

    {/* Icon Container */}
    <Box
      sx={{
        width: { xs: 40, sm: 48, xl: 56 },
        height: { xs: 40, sm: 48, xl: 56 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(12px)",
        borderRadius: 3,
        boxShadow: 1,
        border: "1px solid rgba(255, 255, 255, 0.5)",
        position: "relative",
        zIndex: 30,
        transition: "all 0.3s",
        ".MuiCardActionArea-root:hover &": {
          boxShadow: "0 8px 25px rgba(110, 231, 183, 0.5)",
        },
      }}
    >
      <AddIcon
        sx={{
          fontSize: { xs: 20, xl: 28 },
          opacity: 0.7,
          transition: "opacity 0.3s",
          ".MuiCardActionArea-root:hover &": {
            opacity: 1,
          },
        }}
      />
    </Box>
  </Box>
);

const ThumbnailClock = ({ title }: ThumbnailProps) => (
  <Box
    sx={{
      width: { xs: 56, sm: 64, lg: 80, xl: 112 },
      height: { xs: 56, sm: 64, lg: 80, xl: 112 },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(to top, #e0e7ff, #eef2ff)",
      position: "relative",
      zIndex: 10,
      overflow: "hidden",
      borderRadius: 4,
      transition: "transform 0.5s",
      ".MuiCardActionArea-root:hover &": {
        transform: "scale(1.05)",
      },
    }}
  >
    <Box
      sx={{
        position: "absolute",
        width: { xs: 64, sm: 72, lg: 80, xl: 112 },
        height: { xs: 64, sm: 72, lg: 80, xl: 112 },
        bottom: -20,
        left: -20,
        bgcolor: "rgba(129, 140, 248, 0.2)",
        borderRadius: "50%",
        filter: "blur(24px)",
      }}
    />

    <Box
      sx={{
        width: { xs: 40, sm: 48, xl: 56 },
        height: { xs: 40, sm: 48, xl: 56 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(12px)",
        borderRadius: 3,
        boxShadow: 1,
        border: "1px solid rgba(255, 255, 255, 0.5)",
        position: "relative",
        zIndex: 30,
        transition: "all 0.3s",
        ".MuiCardActionArea-root:hover &": {
          boxShadow: "0 8px 25px rgba(165, 180, 252, 0.5)",
        },
      }}
    >
      <ClockIcon
        sx={{
          fontSize: { xs: 20, xl: 28 },
          opacity: 0.7,
          transition: "opacity 0.3s",
          ".MuiCardActionArea-root:hover &": {
            opacity: 1,
          },
        }}
      />
    </Box>
  </Box>
);

const ThumbnailList = ({ title }: ThumbnailProps) => (
  <Box
    sx={{
      width: { xs: 56, sm: 64, lg: 80, xl: 112 },
      height: { xs: 56, sm: 64, lg: 80, xl: 112 },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(to top, #ffedd5, #fff7ed)",
      position: "relative",
      zIndex: 10,
      overflow: "hidden",
      borderRadius: 4,
      transition: "transform 0.5s",
      ".MuiCardActionArea-root:hover &": {
        transform: "scale(1.05)",
      },
    }}
  >
    <Box
      sx={{
        position: "absolute",
        width: { xs: 48, sm: 56, lg: 64, xl: 96 },
        height: { xs: 48, sm: 56, lg: 64, xl: 96 },
        top: -8,
        right: -8,
        bgcolor: "rgba(251, 146, 60, 0.2)",
        borderRadius: "50%",
        filter: "blur(24px)",
      }}
    />

    <Box
      sx={{
        width: { xs: 40, sm: 48, xl: 56 },
        height: { xs: 40, sm: 48, xl: 56 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(12px)",
        borderRadius: 3,
        boxShadow: 1,
        border: "1px solid rgba(255, 255, 255, 0.5)",
        position: "relative",
        zIndex: 30,
        transition: "all 0.3s",
        ".MuiCardActionArea-root:hover &": {
          boxShadow: "0 8px 25px rgba(253, 186, 116, 0.5)",
        },
      }}
    >
      <SearchIcon
        sx={{
          fontSize: { xs: 20, xl: 28 },
          opacity: 0.7,
          transition: "opacity 0.3s",
          ".MuiCardActionArea-root:hover &": {
            opacity: 1,
          },
        }}
      />
    </Box>
  </Box>
);

interface WorkspaceNavItem {
  id: number;
  title: string;
  description: string;
  thumbnail: React.ReactNode;
}

const workspaceNav: WorkspaceNavItem[] = [
  {
    id: 1,
    title: "신규 사업 등록",
    description: "새로운 프로젝트를 시작하세요",
    thumbnail: <ThumbnailPlus title="신규 사업 등록" />,
  },
  {
    id: 2,
    title: "마지막 편집 불러오기",
    description: "작업하던 내용을 계속하세요",
    thumbnail: <ThumbnailClock title="마지막 편집 불러오기" />,
  },
  {
    id: 3,
    title: "산정 내역 전체 조회",
    description: "모든 프로젝트 이력을 확인하세요",
    thumbnail: <ThumbnailList title="산정 내역 전체 조회" />,
  },
];

interface TabOption {
  value: string;
  label: string;
  count: number;
}

const tabOptions: TabOption[] = [
  { value: "default", label: "3개월 내 갱신목록", count: 12 },
  { value: "expiring", label: "임박(5일내)/지연목록", count: 5 },
];

const WorkspacePage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [mobileSelectValue, setMobileSelectValue] = useState("default");
  const [filterEnabled, setFilterEnabled] = useState(true);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleMobileSelectChange = (event: SelectChangeEvent<string>) => {
    setMobileSelectValue(event.target.value);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "grey.50",
      }}
    >
      <Header />

      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 4, sm: 6 },
          display: "flex",
          flexDirection: "column",
          gap: { xs: 4, sm: 5 },
        }}
      >
        {/* Top Navigation Section */}
        <Box
          component="section"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2.5, sm: 3 },
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "grey.900",
              fontSize: { xs: "1.5rem", sm: "1.875rem" },
            }}
          >
            무엇을 하시겠습니까?
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: { xs: 2, lg: 3 },
            }}
          >
            {workspaceNav.map((nav) => (
              <Card
                key={nav.id}
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "grey.200",
                  transition: "all 0.3s",
                  "&:hover": {
                    borderColor: "transparent",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
                    "& .arrow-indicator": {
                      opacity: 1,
                      transform: "translateX(0)",
                    },
                  },
                }}
              >
                <CardActionArea
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    p: { xs: 2, lg: 2.5 },
                  }}
                >
                  {nav.thumbnail}
                  <Box
                    sx={{
                      ml: 2.5,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        color: "grey.900",
                        transition: "color 0.3s",
                        ".MuiCardActionArea-root:hover &": {
                          color: "success.dark",
                        },
                      }}
                    >
                      {nav.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "grey.500", mt: 0.25, fontWeight: 500 }}
                    >
                      {nav.description}
                    </Typography>
                  </Box>

                  {/* Hover Arrow Indicator */}
                  <Box
                    className="arrow-indicator"
                    sx={{
                      position: "absolute",
                      right: 20,
                      opacity: 0,
                      transform: "translateX(-8px)",
                      transition: "all 0.3s",
                    }}
                  >
                    <ArrowForwardIcon
                      sx={{ color: "grey.400", fontSize: 20 }}
                    />
                  </Box>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Content Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: { xs: 4, lg: 6 },
            alignItems: "flex-start",
          }}
        >
          {/* Main List Column */}
          <Box
            component="section"
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
            }}
          >
            {/* Tabs Header */}
            <Box
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(8px)",
                position: "sticky",
                top: { xs: 0, sm: 64 },
                zIndex: 20,
                borderBottom: "1px solid",
                borderColor: "grey.200",
              }}
            >
              {/* Desktop Tabs */}
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                sx={{
                  display: { xs: "none", sm: "flex" },
                  minHeight: 64,
                  "& .MuiTab-root": {
                    minHeight: 64,
                    textTransform: "none",
                    fontSize: "1.125rem",
                    fontWeight: 500,
                    color: "grey.500",
                    "&.Mui-selected": {
                      fontWeight: 700,
                      color: "grey.900",
                    },
                  },
                  "& .MuiTabs-indicator": {
                    height: 2,
                    bgcolor: "grey.900",
                    borderRadius: "2px 2px 0 0",
                  },
                }}
              >
                {tabOptions.map((option) => (
                  <Tab
                    key={option.value}
                    label={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <span>{option.label}</span>
                        <Badge
                          badgeContent={option.count}
                          sx={{
                            "& .MuiBadge-badge": {
                              position: "relative",
                              transform: "none",
                              bgcolor:
                                selectedTab === tabOptions.indexOf(option)
                                  ? "error.main"
                                  : "grey.200",
                              color:
                                selectedTab === tabOptions.indexOf(option)
                                  ? "white"
                                  : "grey.600",
                              fontWeight: 700,
                              fontSize: "0.75rem",
                              minWidth: 20,
                              height: 20,
                              borderRadius: 10,
                            },
                          }}
                        />
                      </Stack>
                    }
                  />
                ))}
              </Tabs>

              {/* Mobile Dropdown */}
              <Box sx={{ display: { xs: "block", sm: "none" }, py: 1.5 }}>
                <Select
                  value={mobileSelectValue}
                  onChange={handleMobileSelectChange}
                  fullWidth
                  sx={{
                    bgcolor: "grey.100",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "grey.200",
                    },
                    "& .MuiSelect-select": {
                      py: 1.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    },
                  }}
                  renderValue={(value) => {
                    const option = tabOptions.find(
                      (opt) => opt.value === value
                    );
                    return (
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography fontWeight={700}>
                          {option?.label}
                        </Typography>
                        <Chip
                          label={option?.count}
                          size="small"
                          sx={{
                            bgcolor: "error.main",
                            color: "white",
                            fontWeight: 700,
                            fontSize: "0.75rem",
                            height: 20,
                          }}
                        />
                      </Stack>
                    );
                  }}
                >
                  {tabOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              {/* Filter Bar */}
              <Box
                sx={{
                  py: 1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box
                    sx={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      bgcolor: "grey.400",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, color: "grey.500" }}
                  >
                    김광민님이 담당자(수정권한)인 건만 조회합니다.
                  </Typography>
                </Stack>
                <Switch
                  checked={filterEnabled}
                  onChange={(e) => setFilterEnabled(e.target.checked)}
                  color="success"
                  size="small"
                />
              </Box>
            </Box>

            {/* List Items */}
            <Stack spacing={1.5} sx={{ mt: 2 }}>
              {Array.from({ length: 10 }).map((_, index) => (
                <Card
                  key={index}
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: index === 0 ? "info.light" : "grey.200",
                    transition: "all 0.2s",
                    ...(index === 0
                      ? {
                          boxShadow: "0 2px 8px rgba(56, 189, 248, 0.1)",
                          "&:hover": {
                            borderColor: "info.main",
                            boxShadow: "0 8px 24px rgba(56, 189, 248, 0.2)",
                          },
                        }
                      : {
                          "&:hover": {
                            borderColor: "success.main",
                            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
                          },
                        }),
                    "&:hover .action-button": {
                      opacity: 1,
                      transform: "translateX(0)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { sm: "center" },
                      gap: { xs: 2, sm: 3 },
                      p: { xs: 2.5, sm: 3 },
                    }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        sx={{ mb: 0.5 }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 700,
                            color: "grey.900",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            pr: 2,
                          }}
                        >
                          유망한 사업 ABC 프로젝트
                        </Typography>
                        {/* Mobile Action Text */}
                        <Typography
                          sx={{
                            display: { xs: "block", sm: "none" },
                            fontSize: "0.875rem",
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                            color: index === 0 ? "info.main" : "success.main",
                          }}
                        >
                          {index === 0 ? "이어서 진행" : "내역 보기"} →
                        </Typography>
                      </Stack>

                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: "grey.500",
                          mb: 2,
                          fontFamily: "monospace",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        ABC_futsal_tournament_20251114_V01
                      </Typography>

                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={{ xs: 1.5, sm: 3 }}
                        sx={{ fontSize: "0.875rem", color: "grey.600" }}
                      >
                        {/* Last Activity */}
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Avatar
                            sx={{
                              width: 24,
                              height: 24,
                              bgcolor: "grey.100",
                              color: "grey.600",
                              fontSize: "0.625rem",
                              fontWeight: 700,
                              border: "1px solid",
                              borderColor: "grey.200",
                            }}
                          >
                            김
                          </Avatar>
                          <Typography
                            variant="body2"
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <Typography
                              component="span"
                              sx={{ fontWeight: 600, color: "grey.900" }}
                            >
                              김광민
                            </Typography>
                            <Typography
                              component="span"
                              sx={{ color: "grey.400", mx: 0.5 }}
                            >
                              |
                            </Typography>
                            2025.11.12 15:32 수정
                          </Typography>
                        </Stack>

                        {/* Members */}
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="center"
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: 600,
                              color: "grey.400",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                            }}
                          >
                            Members
                          </Typography>
                          <AvatarGroup
                            max={4}
                            sx={{
                              "& .MuiAvatar-root": {
                                width: 28,
                                height: 28,
                                bgcolor: "grey.100",
                                color: "grey.600",
                                fontSize: "0.625rem",
                                fontWeight: 700,
                                border: "2px solid white",
                              },
                            }}
                          >
                            {[1, 2, 3, 4].map((i) => (
                              <Avatar key={i}>김</Avatar>
                            ))}
                          </AvatarGroup>
                        </Stack>
                      </Stack>
                    </Box>

                    {/* Desktop Action Button */}
                    <Button
                      className="action-button"
                      variant="contained"
                      disableElevation
                      sx={{
                        display: { xs: "none", sm: "flex" },
                        borderRadius: 25,
                        px: 3,
                        py: 1.25,
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        textTransform: "none",
                        whiteSpace: "nowrap",
                        opacity: 0,
                        transform: "translateX(16px)",
                        transition: "all 0.2s",
                        bgcolor: index === 0 ? "info.main" : "success.main",
                        boxShadow:
                          index === 0
                            ? "0 4px 12px rgba(56, 189, 248, 0.3)"
                            : "0 4px 12px rgba(34, 197, 94, 0.3)",
                        "&:hover": {
                          bgcolor: index === 0 ? "info.dark" : "success.dark",
                        },
                      }}
                    >
                      {index === 0 ? "이어서 진행" : "내역 보기"}
                    </Button>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Box>

          {/* Sidebar Column */}
          <Box
            component="aside"
            sx={{
              width: { xs: "100%", lg: 400, xl: 440 },
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box sx={{ position: "sticky", top: 64 }}>
              {/* Sidebar Header */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  height: 64,
                  mb: 1,
                  borderBottom: "1px solid",
                  borderColor: "grey.200",
                  bgcolor: "rgba(255, 255, 255, 0.5)",
                  backdropFilter: "blur(8px)",
                  zIndex: 10,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "grey.900" }}
                >
                  공지사항
                </Typography>
                <Button
                  component={Link}
                  href="/boards"
                  endIcon={
                    <ChevronRightIcon sx={{ fontSize: 16, opacity: 0.5 }} />
                  }
                  sx={{
                    color: "grey.500",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    textTransform: "none",
                    borderRadius: 2,
                    px: 1.5,
                    "&:hover": {
                      color: "grey.900",
                      bgcolor: "grey.100",
                    },
                  }}
                >
                  전체보기
                </Button>
              </Stack>

              {/* Notices List */}
              <Stack spacing={0.5}>
                {articles.map((article) => (
                  <Card
                    key={article.id}
                    component={Link}
                    href="/boards/details"
                    elevation={0}
                    sx={{
                      display: "block",
                      p: 2,
                      borderRadius: 3,
                      border: "1px solid transparent",
                      textDecoration: "none",
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: "white",
                        borderColor: "grey.200",
                        boxShadow: 1,
                        "& .article-title": {
                          color: "primary.main",
                        },
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ mb: 1 }}
                    >
                      <Chip
                        label={article.category}
                        size="small"
                        sx={{
                          height: 24,
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          ...(article.category.includes("서비스")
                            ? {
                                bgcolor: "primary.50",
                                color: "primary.main",
                                border: "1px solid",
                                borderColor: "primary.100",
                              }
                            : {
                                bgcolor: "grey.100",
                                color: "grey.600",
                                border: "1px solid",
                                borderColor: "grey.200",
                              }),
                        }}
                      />
                      <Typography variant="caption" sx={{ color: "grey.400" }}>
                        •
                      </Typography>
                      <Typography variant="caption" sx={{ color: "grey.500" }}>
                        {article.date}
                      </Typography>
                    </Stack>

                    <Typography
                      className="article-title"
                      sx={{
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        color: "grey.800",
                        lineHeight: 1.4,
                        transition: "color 0.2s",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        mb: 0.75,
                      }}
                    >
                      {article.title}
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar
                        sx={{
                          width: 20,
                          height: 20,
                          bgcolor: "grey.100",
                          color: "grey.500",
                          fontSize: "0.5625rem",
                          border: "1px solid",
                          borderColor: "grey.200",
                        }}
                      >
                        {article.author[0]}
                      </Avatar>
                      <Typography
                        variant="caption"
                        sx={{ color: "grey.500", fontWeight: 500 }}
                      >
                        {article.author}
                      </Typography>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default WorkspacePage;
