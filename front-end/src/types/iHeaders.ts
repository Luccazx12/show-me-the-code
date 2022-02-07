import { HeadersDefaults } from 'axios';

export interface IHeaders extends HeadersDefaults {
  authorization?: string;
}
