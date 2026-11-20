import {businesses,forms,type Business} from './inquiry.ts';

const recipient = 'buhee@orbitworks.co.kr';
type Environment = Readonly<Record<string,string|undefined>>;
type Credentials = {user:string;pass:string};
type Message = {from:string;to:string;subject:string;text:string};
type Transport = {sendMail(message:Message):Promise<{accepted?:unknown;rejected?:unknown}>};
export type CreateTransport = (credentials:Credentials)=>Transport|Promise<Transport>;

export function configuredMailer(env:Environment):Credentials|undefined {
  if (env.VERCEL_ENV !== 'production' || env.INQUIRY_DELIVERY_ENABLED !== 'true') return;
  const user=env.GMAIL_USER?.trim(), pass=env.GMAIL_APP_PASSWORD?.trim();
  if (!user || !pass || user.length>254 || !/^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(user)) return;
  return {user,pass};
}

const createGmailTransport:CreateTransport = async (auth) => {
  const {default:nodemailer}=await import('nodemailer');
  return nodemailer.createTransport({
    host:'smtp.gmail.com',port:465,secure:true,auth,
    tls:{minVersion:'TLSv1.2',rejectUnauthorized:true},
    logger:false,debug:false,
    connectionTimeout:5000,greetingTimeout:5000,socketTimeout:10000,
    disableFileAccess:true,disableUrlAccess:true,
  });
};

export function inquiryDelivery(env:Environment,createTransport:CreateTransport=createGmailTransport) {
  return {
    configured:()=>configuredMailer(env)!==undefined,
    async send(business:Business,fields:Readonly<Record<string,string>>):Promise<'unconfigured'|'accepted'|'failed'> {
      const credentials=configuredMailer(env);
      if(!credentials)return 'unconfigured';
      const lines=forms[business].flatMap(field=>{
        const value=fields[field.key]?.trim();
        if(!value)return [];
        return [`${field.label.replace(/\s*\*$/u,'')}: ${field.options?.[value]??value}`];
      });
      try {
        const transport=await createTransport(credentials);
        const {accepted,rejected}=await transport.sendMail({
          from:credentials.user,to:recipient,subject:`[가디언링크] ${businesses[business]} 문의`,
          text:`관심 사업: ${businesses[business]}\n개인정보 수집·이용 동의: 예\n\n${lines.join('\n\n')}`,
        });
        const matches=(value:unknown)=>typeof value==='string'&&value.toLowerCase()===recipient;
        return Array.isArray(accepted)&&accepted.some(matches)&&!(Array.isArray(rejected)&&rejected.some(matches))?'accepted':'failed';
      } catch {
        // Transport errors can include SMTP/auth details or personal data. Never log or echo them.
        return 'failed';
      }
    },
  };
}
