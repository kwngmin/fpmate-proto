"use client";

import Header from "@/app/ui/Header";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Chip,
  Avatar,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ListIcon from "@mui/icons-material/List";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const BUTTON_STYLES = {
  height: 44,
  borderColor: "divider",
  color: "text.primary",
  "&:hover": {
    borderColor: "primary.main",
    backgroundColor: "transparent",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
  transition: "border-color 0.2s, transform 0.2s",
} as const;

const BoardsDetailsPage = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box sx={{ py: 6 }}>
        <Container maxWidth="lg" sx={{ px: 3 }}>
          <Stack spacing={{ xs: 2, sm: 3 }}>
            {/* category badge */}
            <Chip
              label="서비스 공지사항"
              size="small"
              variant="outlined"
              sx={{
                fontSize: "0.8125rem",
                fontWeight: 500,
                height: 22,
                width: "fit-content",
                borderRadius: 0.5,
              }}
            />

            {/* title & info section */}
            <Stack spacing={1}>
              {/* 제목 */}
              <Typography
                sx={{
                  fontSize: { xs: "1.3125rem", sm: "1.5rem" },
                  lineHeight: 1.2,
                  letterSpacing: "-0.05em",
                  fontWeight: 600,
                  wordBreak: "keep-all",
                  color: "text.primary",
                }}
              >
                첨부파일 테스트
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ sm: "center" }}
                spacing={{ sm: 1 }}
              >
                {/* meta info */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{
                    order: { sm: 2 },
                    fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                    lineHeight: 1.2,
                  }}
                >
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      display: { xs: "none", sm: "block" },
                      height: 12,
                      alignSelf: "center",
                    }}
                  />
                  <Typography color="text.disabled" fontSize="inherit">
                    등록일시
                  </Typography>
                  <Typography
                    color="text.secondary"
                    fontWeight={500}
                    fontSize="inherit"
                  >
                    2015년 8월 13일 오전 11:00
                  </Typography>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ height: 12, alignSelf: "center" }}
                  />
                  <Typography color="text.disabled" fontSize="inherit">
                    조회수
                  </Typography>
                  <Typography
                    color="text.secondary"
                    fontWeight={500}
                    fontSize="inherit"
                  >
                    20
                  </Typography>
                </Stack>

                {/* author */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ py: 1 }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      fontSize: "0.8125rem",
                      backgroundColor: "grey.300",
                      color: "text.primary",
                    }}
                  >
                    김
                  </Avatar>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.2,
                      wordBreak: "keep-all",
                    }}
                  >
                    <Typography
                      component="span"
                      fontWeight={500}
                      color="text.primary"
                    >
                      김광민
                    </Typography>
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            {/* content section */}
            <Box
              component="p"
              sx={{
                p: 2,
                borderTop: 1,
                borderBottom: 1,
                borderColor: "divider",
                minHeight: 360,
              }}
            >
              첨부파일 테스트
            </Box>

            {/* attachment section */}
            <Box>
              <Button
                variant="text"
                startIcon={<AttachFileIcon sx={{ fontSize: 20 }} />}
                sx={{
                  backgroundColor: "action.hover",
                  borderRadius: 0.5,
                  p: 1.5,
                  color: "text.secondary",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "action.selected",
                  },
                  "&:active": {
                    transform: "scale(0.95)",
                  },
                  transition: "background-color 0.2s, transform 0.2s",
                }}
              >
                SW사업대가_산정_가이드.pdf
              </Button>
            </Box>

            {/* navigation section */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
            >
              <Button
                component={Link}
                href="/boards"
                variant="outlined"
                startIcon={<ListIcon sx={{ fontSize: 20 }} />}
                sx={BUTTON_STYLES}
              >
                목록으로
              </Button>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  startIcon={<ChevronLeftIcon sx={{ fontSize: 20 }} />}
                  sx={{
                    ...BUTTON_STYLES,
                    pr: 2,
                  }}
                >
                  이전
                </Button>
                <Button
                  variant="outlined"
                  endIcon={<ChevronRightIcon sx={{ fontSize: 20 }} />}
                  sx={{
                    ...BUTTON_STYLES,
                    pl: 2,
                  }}
                >
                  다음
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default BoardsDetailsPage;
