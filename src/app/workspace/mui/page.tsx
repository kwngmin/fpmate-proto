"use client";

import Header from "../../ui/Header";
import Link from "next/link";
import { useState } from "react";
import type { SxProps, Theme } from "@mui/material";
import {
  Box,
  Typography,
  Button,
  Card,
  Avatar,
  AvatarGroup,
  Chip,
  Stack,
  Container,
  Divider,
  Switch,
} from "@mui/material";
import {
  Add as AddIcon,
  AccessTime as ClockIcon,
  Search as SearchIcon,
  ChevronRight as ChevronRightIcon,
  ArrowForward as ArrowForwardIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";

interface Article {
  id: number;
  title: string;
  category: string;
  color: string;
  date: string;
  author: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "첨부파일 테스트",
    category: "서비스 공지사항",
    color: "blue",
    date: "2025.12.10",
    author: "강경희",
  },
  {
    id: 2,
    title: "신규 테스트",
    category: "서비스 공지사항",
    color: "blue",
    date: "2025.12.10",
    author: "강경희",
  },
  {
    id: 3,
    title: "새 글 테스트",
    category: "공지사항",
    color: "green",
    date: "2025.12.10",
    author: "김광민",
  },
  {
    id: 4,
    title: "라이센스 테스트",
    category: "서비스 공지사항",
    color: "blue",
    date: "2025.12.10",
    author: "강경희",
  },
  {
    id: 5,
    title: "첨부파일 테스트",
    category: "서비스 공지사항",
    color: "blue",
    date: "2025.12.10",
    author: "강경희",
  },
  {
    id: 6,
    title: "작업 권한 테스트",
    category: "공지사항",
    color: "green",
    date: "2025.12.10",
    author: "백은비",
  },
];

interface ThumbnailProps {
  title: string;
}

// 공통 스타일 정의
const thumbnailContainerSx: SxProps<Theme> = {
  width: { xs: 56, sm: 64, lg: 80, xl: 128 },
  height: { xs: 56, sm: 64, lg: 80, xl: 128 },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  zIndex: 10,
  overflow: "hidden",
};

const thumbnailObjectSx: SxProps<Theme> = {
  position: "absolute",
  width: { xs: 48, sm: 56, lg: 64, xl: 96 },
  height: { xs: 48, sm: 56, lg: 64, xl: 96 },
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
};

const thumbnailIconContainerSx: SxProps<Theme> = {
  width: { xs: 40, sm: 48, xl: 80 },
  height: { xs: 40, sm: 48, xl: 80 },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(4px)",
  borderRadius: 2,
  position: "relative",
  zIndex: 30,
  border: "1px solid rgba(255, 255, 255, 0.2)",
  overflow: "hidden",
};

const thumbnailIconSx: SxProps<Theme> = {
  fontSize: { xs: 24, xl: 32 },
  color: "white",
};

const ThumbnailPlus = ({ title }: ThumbnailProps) => (
  <Box
    sx={
      {
        ...thumbnailContainerSx,
        background: "linear-gradient(to top, #a7f3d0, #d1fae5)",
      } as SxProps<Theme>
    }
  >
    <Box
      sx={
        {
          ...thumbnailObjectSx,
          top: -8,
          left: -8,
          bgcolor: "success.main",
          borderRadius: 2,
        } as SxProps<Theme>
      }
    />
    <Box
      sx={
        {
          ...thumbnailIconContainerSx,
          background:
            "linear-gradient(to bottom right, rgba(0, 171, 85, 0.5), rgba(255, 255, 255, 0.5))",
          boxShadow: "0 4px 6px -1px rgba(0, 171, 85, 0.2)",
        } as SxProps<Theme>
      }
    >
      <AddIcon sx={thumbnailIconSx} />
    </Box>
  </Box>
);

const ThumbnailClock = ({ title }: ThumbnailProps) => (
  <Box
    sx={
      {
        ...thumbnailContainerSx,
        background: "linear-gradient(to top, #c7d2fe, #e0e7ff)",
      } as SxProps<Theme>
    }
  >
    <Box
      sx={
        {
          ...thumbnailObjectSx,
          width: { xs: 64, sm: 72, lg: 80, xl: 112 },
          height: { xs: 64, sm: 72, lg: 80, xl: 112 },
          bottom: -20,
          left: -20,
          bgcolor: "#748CDC",
          borderRadius: "50%",
        } as SxProps<Theme>
      }
    />
    <Box
      sx={
        {
          ...thumbnailIconContainerSx,
          background:
            "linear-gradient(to top right, rgba(116, 140, 220, 0.5), rgba(255, 255, 255, 0.5))",
          boxShadow: "0 4px 6px -1px rgba(116, 140, 220, 0.2)",
        } as SxProps<Theme>
      }
    >
      <ClockIcon sx={thumbnailIconSx} />
    </Box>
  </Box>
);

const ThumbnailList = ({ title }: ThumbnailProps) => (
  <Box
    sx={
      {
        ...thumbnailContainerSx,
        background: "linear-gradient(to top, #fecaca, #fee2e2)",
      } as SxProps<Theme>
    }
  >
    <Box
      sx={
        {
          ...thumbnailObjectSx,
          top: -8,
          right: -8,
          bgcolor: "#F98D78",
          borderRadius: 2,
        } as SxProps<Theme>
      }
    />
    <Box
      sx={
        {
          ...thumbnailIconContainerSx,
          background:
            "linear-gradient(to bottom left, rgba(249, 141, 120, 0.5), rgba(255, 255, 255, 0.5))",
          boxShadow: "0 4px 6px -1px rgba(249, 141, 120, 0.2)",
        } as SxProps<Theme>
      }
    >
      <SearchIcon sx={thumbnailIconSx} />
    </Box>
  </Box>
);

interface WorkspaceNavItem {
  id: number;
  title: string;
  thumbnail: React.ReactNode;
}

const workspaceNav: WorkspaceNavItem[] = [
  {
    id: 1,
    title: "신규 사업 등록",
    thumbnail: <ThumbnailPlus title="신규 사업 등록" />,
  },
  {
    id: 2,
    title: "마지막 편집 불러오기",
    thumbnail: <ThumbnailClock title="마지막 편집 불러오기" />,
  },
  {
    id: 3,
    title: "산정 내역 전체 조회",
    thumbnail: <ThumbnailList title="산정 내역 전체 조회" />,
  },
];

interface SelectOption {
  value: string;
  label: string;
}

const options: SelectOption[] = [
  { value: "default", label: "3개월 내 갱신목록" },
  { value: "expiring", label: "임박(5일내)/지연목록" },
];

// 페이지 레벨 공통 스타일
const stickyHeaderSx: SxProps<Theme> = {
  bgcolor: "background.paper",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: 64,
  borderBottom: "1px solid",
  borderColor: "success.main",
  zIndex: 10,
  position: "sticky",
  top: 64,
};

const badgeSx: SxProps<Theme> = {
  height: 24,
  px: 0.75,
  minWidth: 24,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1rem",
  fontWeight: 600,
};

const tabButtonSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  height: 64,
  borderRadius: 0,
  textTransform: "none",
  color: "text.primary",
  bgcolor: "transparent",
  "&:hover": {
    bgcolor: "transparent",
  },
};

const tabTextSx: SxProps<Theme> = {
  fontSize: "1.3125rem",
  lineHeight: 1.33,
  letterSpacing: "-0.012em",
  fontWeight: 500,
};

const WorkspacePage = () => {
  const [selectedValue, setSelectedValue] = useState("default");
  const [selectedOption, setSelectedOption] = useState<SelectOption>(
    options[0]
  );
  const [filterEnabled, setFilterEnabled] = useState(true);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    setSelectedOption(
      options.find((option) => option.value === value) ?? options[0]
    );
  };

  const handleFilterToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterEnabled(event.target.checked);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      <Header />

      <Container
        maxWidth="lg"
        sx={{
          px: 3,
          py: 6,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* 상단 navigation */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, sm: 3 },
          }}
        >
          <Typography
            sx={
              {
                fontSize: { xs: "1.5rem", sm: "2rem" },
                lineHeight: 1.2,
                letterSpacing: "-0.05em",
                fontWeight: 600,
                color: "text.primary",
              } as SxProps<Theme>
            }
          >
            무엇을 하시겠습니까?
          </Typography>

          <Box
            sx={
              {
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                },
                gap: { xs: 0.5, lg: 1 },
              } as SxProps<Theme>
            }
          >
            {workspaceNav.map((nav) => (
              <Card
                key={nav.id}
                component="button"
                elevation={0}
                sx={
                  {
                    borderRadius: { xs: 1, lg: 3 },
                    border: "1px solid",
                    borderColor: "divider",
                    overflow: "hidden",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                    transition: "all 0.1s",
                    cursor: "pointer",
                    bgcolor: "background.paper",
                    height: { xs: 56, sm: 64, lg: 80, xl: 128 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    p: 0,
                    textAlign: "left",
                    "&:hover": {
                      borderColor: "success.main",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    },
                    "&:active": {
                      transform: "scale(0.99)",
                    },
                  } as SxProps<Theme>
                }
              >
                {nav.thumbnail}
                <Typography
                  sx={{
                    fontSize: "1.0625rem",
                    lineHeight: 1.4,
                    letterSpacing: "-0.01em",
                    color: "text.primary",
                    fontWeight: 500,
                    px: 3,
                  }}
                >
                  {nav.title}
                </Typography>
              </Card>
            ))}
          </Box>
        </Box>

        {/* content container */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 4,
          }}
        >
          {/* tabs content */}
          <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
            {/* header */}
            <Box sx={stickyHeaderSx}>
              {/* tabs - desktop */}
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                <Button disableRipple sx={tabButtonSx}>
                  <Typography sx={tabTextSx}>3개월 내 갱신목록</Typography>
                  <Box
                    sx={
                      {
                        ...badgeSx,
                        bgcolor: "error.main",
                        color: "common.white",
                      } as SxProps<Theme>
                    }
                  >
                    12
                  </Box>
                </Button>

                <Divider orientation="vertical" sx={{ height: 32 }} />

                <Button
                  disableRipple
                  sx={{ ...tabButtonSx, opacity: 0.5 } as SxProps<Theme>}
                >
                  <Typography sx={tabTextSx}>임박(5일내)/지연목록</Typography>
                  <Box
                    sx={
                      {
                        ...badgeSx,
                        bgcolor: "grey.500",
                        color: "common.white",
                      } as SxProps<Theme>
                    }
                  >
                    5
                  </Box>
                </Button>
              </Stack>

              {/* combo box - mobile */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  display: { xs: "block", sm: "none" },
                }}
              >
                <Box
                  component="select"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleChange(e.target.value)
                  }
                  value={selectedValue}
                  sx={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                    height: 64,
                    pointerEvents: "none",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ flexGrow: 1 }}
                  >
                    <Typography sx={tabTextSx}>
                      {selectedOption?.label ?? "3개월 내 갱신목록"}
                    </Typography>
                    <Box
                      sx={
                        {
                          ...badgeSx,
                          bgcolor: "error.main",
                          color: "common.white",
                        } as SxProps<Theme>
                      }
                    >
                      12
                    </Box>
                  </Stack>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: "50%",
                    }}
                  >
                    <KeyboardArrowDownIcon
                      sx={{ fontSize: 24, color: "text.primary" }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* filter */}
            <Box
              sx={{
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 1.5,
                bgcolor: "grey.100",
              }}
            >
              <Typography
                sx={
                  {
                    fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                    lineHeight: 1.2,
                    color: "text.secondary",
                    fontWeight: 500,
                  } as SxProps<Theme>
                }
              >
                김광민님이 담당자(수정권한)인 건만 조회합니다.
              </Typography>
              <Switch
                checked={filterEnabled}
                onChange={handleFilterToggle}
                size="small"
                color="success"
              />
            </Box>

            {/* list content */}
            <Stack spacing={1} sx={{ mt: 1 }}>
              {Array.from({ length: 10 }).map((_, index) => (
                <Card
                  key={index}
                  component="button"
                  elevation={0}
                  sx={
                    {
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                      transition: "all 0.1s",
                      cursor: "pointer",
                      bgcolor: "background.paper",
                      display: "flex",
                      gap: 3,
                      p: 3,
                      alignItems: "center",
                      textAlign: "left",
                      width: "100%",
                      "&:hover": {
                        borderColor:
                          index === 0 ? "info.main" : "success.light",
                        boxShadow:
                          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                      },
                      "&:active": {
                        transform: "scale(0.99)",
                      },
                      "&:hover .title-text": {
                        textDecoration: "underline",
                        textUnderlineOffset: 4,
                      },
                    } as SxProps<Theme>
                  }
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      className="title-text"
                      sx={{
                        textAlign: "start",
                        fontSize: "1.0625rem",
                        lineHeight: 1.4,
                        letterSpacing: "-0.012em",
                        fontWeight: 600,
                        color: "text.primary",
                      }}
                    >
                      유망한 사업 ABC
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "start",
                        fontWeight: 500,
                        color: "text.secondary",
                      }}
                    >
                      ABC futsal tournament_20251114_V01
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ py: 1 }}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: "grey.200",
                          color: "text.primary",
                          fontSize: "0.875rem",
                        }}
                      >
                        김
                      </Avatar>
                      <Typography
                        sx={{
                          fontSize: "0.8125rem",
                          letterSpacing: "-0.01em",
                          color: "text.secondary",
                          lineHeight: 1.2,
                          textAlign: "start",
                        }}
                      >
                        <Box
                          component="span"
                          sx={{ fontWeight: 500, color: "text.primary" }}
                        >
                          김광민
                        </Box>
                        님이 2025년 11월 12일 PM 03:32, 비용 산정 절차를
                        진행했습니다.
                      </Typography>
                    </Stack>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={1}
                      sx={{ fontSize: "0.8125rem", letterSpacing: "-0.01em" }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography
                          sx={{ color: "text.secondary", fontSize: "inherit" }}
                        >
                          사업 담당자
                        </Typography>
                        <AvatarGroup
                          max={4}
                          sx={{
                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              bgcolor: "grey.200",
                              color: "text.primary",
                              fontSize: "0.875rem",
                              borderColor: "background.paper",
                            },
                          }}
                        >
                          {[1, 2, 3, 4].map((i) => (
                            <Avatar key={i}>김</Avatar>
                          ))}
                        </AvatarGroup>
                      </Stack>

                      {/* mobile action */}
                      <Stack
                        direction="row"
                        spacing={0.5}
                        alignItems="center"
                        sx={{
                          display: { xs: "flex", sm: "none" },
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          color: "success.dark",
                          flexShrink: 0,
                        }}
                      >
                        {index === 0 ? "이어서 진행" : "내역 보기"}
                        <ArrowForwardIcon sx={{ fontSize: 16 }} />
                      </Stack>
                    </Stack>
                  </Box>

                  {/* desktop action button */}
                  <Box
                    component="span"
                    sx={{
                      display: { xs: "none", sm: "flex" },
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 25,
                      px: 2.5,
                      height: 36,
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      flexShrink: 0,
                      bgcolor: index === 0 ? "info.main" : "success.main",
                      color: "common.white",
                    }}
                  >
                    {index === 0 ? "이어서 진행" : "내역 보기"}
                  </Box>
                </Card>
              ))}
            </Stack>
          </Box>

          {/* boards */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { lg: 440 },
              position: "sticky",
              top: 64,
              height: "fit-content",
            }}
          >
            {/* boards header */}
            <Box sx={{ ...stickyHeaderSx, mb: 1.5 } as SxProps<Theme>}>
              <Typography
                sx={{
                  fontSize: "1.3125rem",
                  lineHeight: 1.33,
                  letterSpacing: "-0.012em",
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
                공지사항 / 게시글
              </Typography>

              <Button
                component={Link}
                href="/boards"
                disableRipple
                endIcon={<ChevronRightIcon sx={{ fontSize: 16 }} />}
                sx={{
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  textTransform: "none",
                  color: "text.primary",
                  borderRadius: 1,
                  px: 1.75,
                  py: 1,
                  bgcolor: "transparent",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                  "&:active": {
                    bgcolor: "action.selected",
                  },
                }}
              >
                자세히 보기
              </Button>
            </Box>

            {/* articles list */}
            <Stack spacing={0}>
              {articles.map((article) => (
                <Box
                  key={article.id}
                  component={Link}
                  href="/boards/details"
                  sx={{
                    py: 1.5,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.75,
                    cursor: "pointer",
                    textDecoration: "none",
                    "&:hover .article-title": {
                      color: "primary.main",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={1}
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip
                        label={article.category}
                        size="small"
                        sx={{
                          height: 22,
                          fontSize: "0.8125rem",
                          fontWeight: 500,
                          letterSpacing: "-0.02em",
                          color: "text.secondary",
                          bgcolor: "grey.100",
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 0.5,
                        }}
                      />
                      <Divider orientation="vertical" sx={{ height: 12 }} />
                      <Typography
                        sx={{
                          fontSize: "0.875rem",
                          color: "text.secondary",
                          lineHeight: 1.2,
                        }}
                      >
                        {article.date}
                      </Typography>
                      <Divider orientation="vertical" sx={{ height: 12 }} />
                      <Typography
                        sx={{
                          fontSize: "0.8125rem",
                          fontWeight: 500,
                          color: "text.disabled",
                          lineHeight: 1.2,
                        }}
                      >
                        {article.author}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Typography
                    className="article-title"
                    sx={
                      {
                        fontSize: { xs: "1.0625rem", sm: "0.9375rem" },
                        lineHeight: 1.4,
                        letterSpacing: "-0.01em",
                        fontWeight: 500,
                        color: "text.primary",
                        textDecoration: "underline",
                        textUnderlineOffset: 4,
                        textAlign: "start",
                        transition: "color 0.2s",
                      } as SxProps<Theme>
                    }
                  >
                    {article.title}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default WorkspacePage;
