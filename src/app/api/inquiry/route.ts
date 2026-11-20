import {createInquiryHandlers} from '@/lib/inquiry-response';

export const runtime='nodejs';
export const dynamic='force-dynamic';
export const {GET,POST}=createInquiryHandlers();
