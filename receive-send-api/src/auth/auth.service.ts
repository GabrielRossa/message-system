import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  async verifyToken(auth: string, userIdSend: number) {
    try {
      const response = await axios.get(
        `http://localhost:3001/auth/verify?user=${userIdSend}`,
        { headers: { Authorization: auth } },
      );
      console.log(response.data)
      return response.data;
      
    } catch (error) {
        console.log(userIdSend, auth)
      throw new UnauthorizedException('Invalid token authservice');
    }
  }
}
