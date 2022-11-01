import { useLocation } from 'wouter';

export const useNavigate = () => {
  const [_, setLocation] = useLocation();
  return setLocation;
};