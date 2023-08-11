import http from '@/core/http';

export const getVerificationCode = () => {
  const from = 'login';
  const checkCodeId = `${from}${(Math.random() + '').substring(2)}`;
  return http.get({ url: '/login_check_code.php', data: { id: checkCodeId, from } })
};