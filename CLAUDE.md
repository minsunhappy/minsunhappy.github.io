# Minsun Kim - Personal Academic Homepage

KAIST 문화기술대학원 석사과정 Minsun Kim의 개인 학술 포트폴리오 홈페이지.

## Deployment

- **URL**: https://minsunhappy.com/homepage
- **Server**: Linux (WSL2), Caddy reverse proxy
- **Caddyfile**: `/etc/caddy/Caddyfile` (실제 사용), `/home/sunny/help-minsun/deploy/Caddyfile` (소스 관리)
- **Caddy 리로드**: `sudo systemctl reload caddy`
- **같은 도메인의 다른 앱**: `/help-minsun` → FastAPI 대시보드 (별도 프로젝트)

## Tech Stack

- **순수 HTML/CSS/JS** (빌드 도구 없음, 프레임워크 없음)
- 정적 파일 서빙 (Caddy `file_server`)
- Google Fonts (Inter)

## Project Structure

```
homepage/
├── index.html          # SPA - 모든 섹션 포함 (About, Publications)
├── CV_MinsunKim.pdf    # CV PDF (사용자 직접 관리)
├── CLAUDE.md           # 이 파일
├── css/
│   ├── variables.css   # CSS 변수 (초록색 테마, 라이트/다크)
│   ├── base.css        # 리셋, 타이포그래피
│   ├── layout.css      # 네비게이션, 섹션, 반응형
│   ├── components.css  # 카드, 프로필, 타임라인, 라이트박스, CV 모달
│   └── animations.css  # 스크롤 등장 애니메이션
├── js/
│   ├── theme.js        # 다크모드 토글 + localStorage
│   ├── nav.js          # 스크롤 스파이 + 햄버거 메뉴
│   ├── animations.js   # IntersectionObserver 기반 등장 효과
│   └── lightbox.js     # 이미지 확대 + CV 팝업 모달
└── assets/
    ├── img/            # 프로필 사진, 논문 이미지
    └── pdf/            # (사용 안 함 - CV는 루트에)
```

## Design System

- **색상 테마**: 초록색 (Nature Green)
  - 라이트 accent: `#15803d`, 다크 accent: `#4ade80`
  - CSS 변수로 관리 (`css/variables.css`)
  - `[data-theme="dark"]` 셀렉터로 다크모드
- **폰트**: Inter (Google Fonts)
- **max-width**: 1100px
- **반응형 브레이크포인트**: 375px, 768px

## Page Sections

### About (메인)
- 프로필 사진 (yoda.png, 원형) + 소셜 링크 (Email, LinkedIn, X)
- 소개 텍스트, Research Interests, Vision
- **News**: 프로필 사진 아래 왼쪽 컬럼에 인라인 표시

### Publications
- 논문 카드 3개 (이미지 + 정보)
- 키워드 뱃지 (HCI, Video Editing, Computer Vision)
- 이미지 클릭 → 라이트박스 확대
- YouTube 비디오 임베드 (Highlight Videos)

### CV
- 네비게이션 "CV" 클릭 → 팝업 모달로 PDF 표시
- 별도 스크롤 섹션 없음

## Key Implementation Details

- `<base href="/homepage/">` — 서브경로 배포를 위한 상대 경로 해결
- 인라인 `<script>` — FOUC 방지를 위해 페인트 전 테마 적용
- `localStorage('homepage-theme')` — 테마 저장, allowlist 검증 포함
- `prefers-reduced-motion` — CSS + JS 양쪽에서 존중
- YouTube iframe — `sandbox="allow-scripts allow-same-origin allow-presentation"` 적용
- Caddyfile — `X-Frame-Options: SAMEORIGIN` (CV iframe 호환), `Permissions-Policy` 설정

## Content Sources

- 논문/뉴스 데이터: 기존 GitHub 레포 `minsunhappy/minsunhappy.github.io` (al-folio Jekyll) 참고
- 이미지: 같은 레포의 `assets/img/publication_preview/` 에서 다운로드
- CV PDF: 사용자가 직접 `/home/sunny/homepage/CV_MinsunKim.pdf` 에 배치

## How to Update

- **논문 추가**: `index.html`의 `<!-- PUBLICATIONS SECTION START -->` 영역에 `pub-card` 추가
- **뉴스 추가**: `index.html`의 `about__news-list` 안에 `about__news-item` 추가
- **CV 교체**: `/home/sunny/homepage/CV_MinsunKim.pdf` 파일 덮어쓰기
- **색상 변경**: `css/variables.css`의 CSS 변수 수정
- **Caddy 설정 변경 후**: `sudo systemctl reload caddy`
