import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(req: NextRequest) {
  const { company, manager, phone, email, units, consult } = await req.json();

  if (!company || !manager || !phone || !email) {
    return NextResponse.json({ error: "회사명, 담당자명, 연락처, 이메일은 필수입니다." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });

  const html = `
    <div style="font-family:'Apple SD Gothic Neo',sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#fff;border:1px solid #E4E6E8;border-radius:12px;">
      <div style="margin-bottom:24px;padding-bottom:20px;border-bottom:2px solid #0AC3C4;">
        <h2 style="margin:0;font-size:20px;color:#161616;">새 상담 신청이 접수되었습니다</h2>
        <p style="margin:6px 0 0;font-size:14px;color:#71767D;">오빗웍스 도입 문의</p>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #F2F3F4;width:30%;font-size:14px;font-weight:700;color:#71767D;vertical-align:top;">회사명</td>
          <td style="padding:12px 0;border-bottom:1px solid #F2F3F4;font-size:15px;color:#161616;">${escapeHtml(company)}</td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #F2F3F4;font-size:14px;font-weight:700;color:#71767D;vertical-align:top;">담당자명</td>
          <td style="padding:12px 0;border-bottom:1px solid #F2F3F4;font-size:15px;color:#161616;">${escapeHtml(manager)}</td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #F2F3F4;font-size:14px;font-weight:700;color:#71767D;vertical-align:top;">연락처</td>
          <td style="padding:12px 0;border-bottom:1px solid #F2F3F4;font-size:15px;color:#161616;">${escapeHtml(phone)}</td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #F2F3F4;font-size:14px;font-weight:700;color:#71767D;vertical-align:top;">이메일</td>
          <td style="padding:12px 0;border-bottom:1px solid #F2F3F4;font-size:15px;color:#161616;">${escapeHtml(email)}</td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #F2F3F4;font-size:14px;font-weight:700;color:#71767D;vertical-align:top;">단지 수</td>
          <td style="padding:12px 0;border-bottom:1px solid #F2F3F4;font-size:15px;color:#161616;">${escapeHtml(units || "미입력")}</td>
        </tr>
        <tr>
          <td style="padding:12px 0;font-size:14px;font-weight:700;color:#71767D;vertical-align:top;">상담 방식</td>
          <td style="padding:12px 0;font-size:15px;color:#161616;">${escapeHtml(consult)}</td>
        </tr>
      </table>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"오빗웍스 상담봇" <${process.env.GMAIL_USER}>`,
      to: "buhee@orbitworks.co.kr",
      replyTo: singleLine(email),
      subject: `[오빗웍스] 상담 신청 — ${singleLine(company)} (${singleLine(manager)})`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("메일 발송 오류:", err);
    return NextResponse.json({ error: "메일 발송에 실패했습니다." }, { status: 500 });
  }
}
