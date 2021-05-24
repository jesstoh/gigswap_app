import { logout } from '../slices/authenticationSlice';

export function handleLogout(dispatch) {
  dispatch(logout());
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
}
