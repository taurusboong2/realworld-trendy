export const WRONG_email = '*이메일 형식이 아닙니다.';

export const REQUIRED_message = '*필수 항목입니다.';

export const MIN_length_2 = '*최소 2글자 이상이어야 합니다.';

export const MIN_length_4 = '*최소 4글자 이상이어야 합니다.';

export const MAX_length_20 = '*최소 20글자 이하이어야 합니다.';

export const MAX_length_40 = '*최소 40글자 이하이어야 합니다.';

export const UNIQUE_idOrEmail = (idOrEmail: string) => `*${idOrEmail}은 고유해야 합니다.`;

export const UNIQUE_title = '*title은 고유해야 합니다.';

export const AUTH_changedInfo = '사용자 정보 변경이 성공적으로 완료되었습니다.';

export const AUTH_required = '로그인이 필요한 페이지입니다!';

export const AUTH_logoutDone = '로그아웃이 성공적으로 완료되었습니다.';

export const AUTH_welcomeMessage = (userName: string) => `환영합니다 ${userName}님!`;

export const AUTH_registerDone = (userName: string) => `${userName}님의 회원가입이 성공적으로 진행되었습니다.`;

export const AUTH_Forbidden = 'email 또는 password를 확인해주세요!';

export const ARTICLE_createDone = '게시글이 성공적으로 생성되었습니다.';

export const ARTICLE_updateDone = '게시글이 성공적으로 수정되었습니다.';

export const ARTICLE_notFound = '*존재하지 않는 게시글입니다.';

export const ARTICLE_failValidate = 'title은 고유해야 합니다.';

export const ARTICLE_deleteComplete = '게시글이 성공적으로 삭제되었습니다.';

export const COMMENT_createSuccess = '댓글이 성공적으로 생성되었습니다.';

export const COMMENT_deleteSuccess = '댓글이 성공적으로 삭제되었습니다.';

export const REDIRECT_pageNotFound = 'Page Not Found';
