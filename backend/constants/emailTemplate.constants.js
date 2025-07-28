import fs from 'fs';
import path from 'path';

export const INVITE_TEMPLATE= fs.readFileSync(path.join(process.cwd(), 'materials', 'templates', 'invitationEmail.html'), 'utf-8');

export const ACCEPT_TEMPLATE= fs.readFileSync(path.join(process.cwd(), 'materials', 'templates', 'acceptanceEmail.html'), 'utf-8');

export const REJECT_TEMPLATE= fs.readFileSync(path.join(process.cwd(), 'materials', 'templates', 'rejectionEmail.html'), 'utf-8');