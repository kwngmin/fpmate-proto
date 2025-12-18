"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Avatar,
  Chip,
  List,
  ListItemButton,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import EditIcon from "@mui/icons-material/Edit";
import Header from "@/app/ui/Header";

interface Category {
  title: string;
  color: string;
  key: string;
}

interface BoardItem {
  id: number;
  title: string;
  category: Category;
  isNew: boolean;
  date: string;
  author: string;
}

const categories: Category[] = [
  { title: "서비스 공지사항", color: "blue", key: "service" },
  { title: "공지사항", color: "green", key: "notice" },
  { title: "게시글", color: "orange", key: "article" },
];

const dummyData: BoardItem[] = [
  {
    id: 13,
    title: "공지사항",
    category: categories[0],
    isNew: true,
    date: "2015년 8월 13일 오전 11:00",
    author: "강경희",
  },
  {
    id: 12,
    title: "FPMate 서비스 업데이트 안내",
    category: categories[0],
    isNew: true,
    date: "2015년 8월 12일 오후 2:30",
    author: "김민수",
  },
  {
    id: 11,
    title: "신규 기능 추가: 스마트 대가산정",
    category: categories[1],
    isNew: true,
    date: "2015년 8월 11일 오전 9:15",
    author: "이지은",
  },
  {
    id: 10,
    title: "시스템 점검 안내",
    category: categories[0],
    isNew: false,
    date: "2015년 8월 10일 오후 4:45",
    author: "박준호",
  },
  {
    id: 9,
    title: "오류 검증 기능 개선 사항",
    category: categories[2],
    isNew: false,
    date: "2015년 8월 9일 오전 10:20",
    author: "최수진",
  },
  {
    id: 8,
    title: "사용자 가이드 업데이트",
    category: categories[1],
    isNew: false,
    date: "2015년 8월 8일 오후 3:10",
    author: "정태영",
  },
  {
    id: 7,
    title: "데이터 내보내기 기능 추가",
    category: categories[2],
    isNew: false,
    date: "2015년 8월 7일 오전 11:30",
    author: "한소영",
  },
  {
    id: 6,
    title: "연말 연휴 서비스 운영 안내",
    category: categories[0],
    isNew: false,
    date: "2015년 8월 6일 오후 1:25",
    author: "윤성호",
  },
  {
    id: 5,
    title: "보안 강화 업데이트 완료",
    category: categories[1],
    isNew: false,
    date: "2015년 8월 5일 오전 8:50",
    author: "오지훈",
  },
  {
    id: 4,
    title: "API 문서 업데이트 안내",
    category: categories[2],
    isNew: false,
    date: "2015년 8월 4일 오후 5:15",
    author: "임다혜",
  },
  {
    id: 3,
    title: "성능 최적화 작업 완료",
    category: categories[0],
    isNew: false,
    date: "2015년 8월 3일 오전 10:05",
    author: "송민규",
  },
  {
    id: 2,
    title: "새로운 템플릿 추가",
    category: categories[1],
    isNew: false,
    date: "2015년 8월 2일 오후 2:40",
    author: "배현우",
  },
  {
    id: 1,
    title: "고객 지원 시간 변경 안내",
    category: categories[0],
    isNew: false,
    date: "2015년 8월 1일 오전 9:00",
    author: "신동욱",
  },
  {
    id: 0,
    title: "모바일 앱 출시 예정 안내",
    category: categories[1],
    isNew: false,
    date: "2015년 7월 31일 오후 3:55",
    author: "조은서",
  },
  {
    id: -1,
    title: "데이터 백업 기능 개선",
    category: categories[2],
    isNew: false,
    date: "2015년 7월 30일 오전 11:20",
    author: "홍길동",
  },
  {
    id: -2,
    title: "사용자 피드백 반영 사항",
    category: categories[0],
    isNew: false,
    date: "2015년 7월 29일 오후 4:10",
    author: "김철수",
  },
  {
    id: -3,
    title: "월간 리포트 기능 추가",
    category: categories[1],
    isNew: false,
    date: "2015년 7월 28일 오전 10:35",
    author: "이영희",
  },
  {
    id: -4,
    title: "서비스 이용약관 개정 안내",
    category: categories[0],
    isNew: false,
    date: "2015년 7월 27일 오후 1:50",
    author: "박민수",
  },
  {
    id: -5,
    title: "다국어 지원 확대",
    category: categories[2],
    isNew: false,
    date: "2015년 7월 26일 오전 9:25",
    author: "최지영",
  },
];

interface BoardListItemProps {
  item: BoardItem;
}

const BoardListItem = ({ item }: BoardListItemProps) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <ListItemButton
      component={Link}
      href="/boards/details"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        py: { xs: 2, md: 0 },
        justifyContent: "space-between",
        borderBottom: 1,
        borderColor: "divider",
        height: { md: 64 },
        "&:hover": {
          backgroundColor: { md: "action.hover" },
        },
        "& .title-text:hover": {
          textDecoration: { md: "underline" },
          textUnderlineOffset: 4,
        },
      }}
    >
      {/* left side */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* 조회수 */}
        {isMdUp && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.secondary",
              fontSize: "0.875rem",
              width: 56,
            }}
          >
            {item.id}
          </Box>
        )}

        {/* 카테고리, 날짜, 작성자 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { md: "center" },
            gap: 1,
            fontSize: "0.875rem",
            flexGrow: 1,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            {/* category badge */}
            <Chip
              label={item.category.title}
              size="small"
              variant="outlined"
              sx={{
                fontSize: "0.8125rem",
                fontWeight: 500,
                height: 22,
                borderRadius: 0.5,
              }}
            />

            {/* mobile only: separator, date, author */}
            {!isMdUp && (
              <>
                <Box
                  sx={{
                    height: 12,
                    width: 1,
                    backgroundColor: "divider",
                  }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.2 }}
                >
                  {item.date}
                </Typography>
                <Box
                  sx={{
                    height: 12,
                    width: 1,
                    backgroundColor: "divider",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: "text.disabled",
                    lineHeight: 1.2,
                  }}
                >
                  {item.author}
                </Typography>
              </>
            )}
          </Stack>

          {/* title & new badge */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              className="title-text"
              sx={{
                fontSize: "1.0625rem",
                color: "text.primary",
                fontWeight: 500,
              }}
            >
              {item.category.title}
            </Typography>

            {item.isNew && (
              <Chip
                label="NEW"
                size="small"
                sx={{
                  height: 18,
                  fontSize: "11px",
                  fontWeight: 800,
                  backgroundColor: "error.main",
                  color: "common.white",
                  borderRadius: 2,
                  "& .MuiChip-label": {
                    px: 0.75,
                  },
                }}
              />
            )}
          </Stack>
        </Box>
      </Box>

      {/* right side - desktop only */}
      {isMdUp && (
        <Stack direction="row" spacing={1} alignItems="center">
          {/* author */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              fontSize: "0.8125rem",
              letterSpacing: "-0.025em",
              py: 1,
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                backgroundColor: "grey.300",
                fontSize: "0.875rem",
              }}
            >
              {item.author.charAt(0)}
            </Avatar>
            <Typography
              sx={{
                color: "text.secondary",
                lineHeight: 1.2,
                textAlign: "start",
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
                {item.author}
              </Typography>
            </Typography>
          </Stack>

          {/* date */}
          <Typography
            sx={{
              width: 224,
              px: 1.5,
              textAlign: "end",
              fontSize: "0.875rem",
              color: "text.disabled",
              fontWeight: 500,
            }}
          >
            {item.date}
          </Typography>
        </Stack>
      )}
    </ListItemButton>
  );
};

const BoardsPage = () => {
  const [myPosts, setMyPosts] = useState(false);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleToggleMyPosts = () => {
    setMyPosts((prev) => !prev);
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box sx={{ py: 6, position: "relative", zIndex: 40 }}>
        <Container maxWidth="lg" sx={{ px: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                fontSize: { xs: "1.5rem", sm: "2rem" },
                lineHeight: 1.2,
                letterSpacing: "-0.05em",
                fontWeight: 600,
                color: "text.primary",
                wordBreak: "keep-all",
              }}
            >
              공지사항 및 게시글을 조회합니다.
            </Typography>

            <Box>
              {/* toolbar */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
                sx={{
                  position: "sticky",
                  top: 64,
                  backgroundColor: "background.paper",
                  zIndex: 10,
                  height: { xs: 64, sm: 80 },
                  borderBottom: 1,
                  borderColor: "primary.main",
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    placeholder="제목, 작성자, 내용으로 검색하세요."
                    size="small"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon sx={{ opacity: 0.3, fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      width: 288,
                      "& .MuiOutlinedInput-root": {
                        height: 44,
                        "&:hover fieldset": {
                          borderColor: "primary.main",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "primary.main",
                          borderWidth: 2,
                        },
                      },
                    }}
                  />
                  <Button
                    variant={myPosts ? "contained" : "outlined"}
                    onClick={handleToggleMyPosts}
                    startIcon={
                      myPosts ? <FilterAltIcon /> : <FilterAltOutlinedIcon />
                    }
                    sx={{
                      height: 44,
                      minWidth: { xs: 44, sm: "auto" },
                      px: { xs: 0, sm: 2 },
                      backgroundColor: myPosts
                        ? "action.selected"
                        : "transparent",
                      borderColor: myPosts ? "primary.main" : "divider",
                      color: "text.primary",
                      "&:hover": {
                        borderColor: "primary.main",
                        backgroundColor: myPosts
                          ? "action.selected"
                          : "transparent",
                      },
                      "&:active": {
                        backgroundColor: "action.hover",
                      },
                      "& .MuiButton-startIcon": {
                        margin: { xs: 0, sm: "0 8px 0 -4px" },
                        opacity: myPosts ? 1 : 0.5,
                      },
                    }}
                  >
                    {isSmUp && "내 글 조회"}
                  </Button>
                </Stack>

                <Button
                  variant="contained"
                  startIcon={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 44,
                        height: 44,
                        backgroundColor: "#007B55",
                        ml: { xs: 0, sm: -2 },
                        mr: { sm: -1 },
                      }}
                    >
                      <EditIcon sx={{ color: "common.white" }} />
                    </Box>
                  }
                  sx={{
                    height: 44,
                    minWidth: { xs: 44, sm: 128 },
                    p: 0,
                    overflow: "hidden",
                    borderRadius: { xs: 1, sm: 2 },
                    backgroundColor: "success.main",
                    "&:hover": {
                      backgroundColor: "success.dark",
                    },
                    "&:active": {
                      transform: "scale(0.95)",
                    },
                    transition: "transform 0.2s",
                    "& .MuiButton-startIcon": {
                      margin: 0,
                    },
                  }}
                >
                  {isSmUp && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexGrow: 1,
                        height: "100%",
                        fontWeight: 600,
                        px: 2,
                      }}
                    >
                      신규 추가
                    </Box>
                  )}
                </Button>
              </Stack>

              {/* 게시글 목록 */}
              <List disablePadding>
                {dummyData.map((item) => (
                  <BoardListItem key={item.id} item={item} />
                ))}
              </List>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default BoardsPage;
