const users = [
  {
    group: "independent",
    title: "Independent Voices",
    desc:
      "The independent voices user community focuses on those individuals and organizations whose views and activities remain independent from entities such as governments, governmental bodies, and corporations. Many of these users adopt a cybersecurity posture that uses encryption due to their professional or political circumstances to protect against surveillance and data theft. The user community includes journalists, activists, dissidents, civil society, and non-governmental organizations (NGOs). Encryption is often cited an enabler of and necessary tool for journalism. Activists, political dissidents, and human rights defenders use encryption to protect themselves while they organize and operate in the face of repressive regimes.",
    types:
      "Person-to-person communication; content sharing; coordination and mobilization;",
  },
  {
    group: "at-risk",
    title: "At-Risk Groups",
    desc:
      "The at-risk user group includes those marginalized by governments and societies based on their identity or minority status, on the grounds of race, gender, ethnicity, sexual orientation, or other forms of identity. At-risk users may also be those who require protection based on circumstance or surroundings, such as victims of domestic abuse or violence, medical personnel in conflict environments, and refugee or migrant populations. The at-risk communities share many concerns with the independent voices community. However, a distinction for these users is that the risk is not solely from government access to information. Social persecution may also come from the general population.",
    types:
      "Person-to-person communication; community building and information sharing;",
  },
  {
    group: "businesses",
    title: "Businesses and Organizations",
    desc:
      "In the Information Age, digital security is an essential part of running a business. Businesses and organization need encryption to secure data and communications. Organizations must contend with the threat of cybercrime and cyberattacks, law enforcement data requests, and the implications of requirements on data localization and data privacy, to name a few. Encryption is necessary for the security and privacy of customer and employee information. Data breaches that expose significant amounts of consumer and sensitive data routinely make headlines. Encryption may also be used against businesses, as is the case in ransomware that employs encryption to launch attacks, secure information for ransom, and collect the requisite ransom.",
    types:
      "Person-to-person communication; information sharing; financial transactions and commerce",
  },
  {
    group: "foreign-policy",
    title: "Foreign Policy",
    desc:
      "While concerned with the challenges encryption can pose to public safety, national security and foreign policy officials in the United States and like-minded nations are themselves turning to commercial encryption platforms for informal—and sometimes formal—communications and data security.  For diplomats and military and intelligence officers, messaging apps such as Signal, WhatsApp, and Wickr provide a reasonably secure and instant means of communication with government colleagues, local contacts, and foreign officials.",
    types:
      "Person-to-person communication; Coordination and mobilization; content sharing ",
  },
  {
    group: "terrorists",
    title: "Terrorists, Extremists, and Hate Groups",
    desc:
      "For jihadist groups to the far-right and white nationalist extremist groups, encryption plays a vital role in each group’s continued existence and operations. As internet and social media platforms have attempted to moderate hateful and violent content and ban extremist users, encrypted messaging apps and email have become a “virtual safe haven.” While differing dramatically in goals and beliefs, terrorists, extremists, and violent hate groups similarly use encryption as a core element of their digital arsenal to recruit members, build and expand global networks, disseminate propaganda, and coordinate operations and attacks.",
    types:
      "Person-to-person communication; Broadcasting and information dissemination; Groups and Community Building; Content Sharing; Coordination and Mobilization; Commerce and Financial Transactions",
  },
];

users.forEach((user) => {
  tippy("." + user.group, {
    content:
      "<div class='tip-header'><img src='icons/" +
      user.group +
      ".png' alt='Icon' class='tip-icon' /><h2>" +
      user.title +
      "</h2></div><br/><p>" +
      user.desc +
      "</p>",
    allowHTML: true,
    arrow: "false",
    interactive: "true",
  });
});
