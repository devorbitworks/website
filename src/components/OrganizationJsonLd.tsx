const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "주식회사 가디언링크",
  alternateName: "가디언링크",
  url: "https://www.orbitworks.co.kr",
  logo: "https://www.orbitworks.co.kr/guardianlink-logo.png",
  description: "경비·미화·시설관리 용역업체를 위한 통합 그룹웨어 오빗웍스 개발사",
  address: {
    "@type": "PostalAddress",
    addressCountry: "KR",
    addressLocality: "서울특별시 관악구",
    streetAddress: "양녕로1길 36, 1동 B1F Q7",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "buhee@orbitworks.co.kr",
    contactType: "sales",
  },
};

export default function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
    />
  );
}
