function init(jsonObj) {
	let images = document.querySelectorAll("picture");
	for (let i = 0; i < images.length; i++) {
  }
		tippy(".statement", {
			// trigger: 'click', // mouseenter, click, focus; manual.
			content(reference) {
				const num = reference.dataset.object;
				//const id = num.split("-")[1];
				//const template = document.getElementById(id);
				let statement = "<p>" + jsonObj[num].Statement + "</p>";
				let url = "<div><a style='font-size:13px;' href='" + jsonObj[num].Url + "' alt='View Source' target='_blank'>View Source</div>";
				let content = statement + url
				return content;
			},
			allowHTML: true,
			theme: "light",
			arrow: true,
			trigger: "click",
			interactive: true,
			// showOnInit: true // to ease styling
		});
	
}

/*   const lineG = document.getElementsByClassName('statement-text')
  for(let i = 0; i < lineG.length; i++)
  {
    let lineArray = lineG[i].querySelectorAll("path");
    
    let lineCombined = []
    for(let p = 0; p < lineArray.length; p++)
    {
      let linepath = lineArray[p].getAttribute('d')
      lineCombined.push(linepath)
      if ( p != 0){
      lineArray[p].remove()
      }
    }
    console.log(lineArray)
    let lineFirst = lineG[i].querySelector("path").getAttribute('d');
    lineFirst = lineArray.toString();
    console.log(lineFirst)
  } */

const jsonObj = [
	{
	  "Num": 0,
	  "Date": "1989-02-27T05:00:00.000Z",
	  "Administration": "George H.W. Bush",
	  "Statement": "“I will work closely with President Roh to coordinate our efforts to draw the North toward practical, peaceful and productive dialogue, to insure that our policies are complementary and mutually reinforcing.”",
	  "Context": "Presidential Address to ROK National Assembly",
	  "Url": "https://www.nytimes.com/1989/02/27/world/bush-hails-seoul-for-building-ties-with-north-korea.html"
	},
	{
	  "Num": 1,
	  "Date": "1992-01-06T05:00:00.000Z",
	  "Administration": "George H.W. Bush",
	  "Statement": "If North Korea fulfills its obligation and takes steps to implement the inspection agreements, then President Roh and I are prepared to forgo the Team Spirit exercise for this year",
	  "Context": "President Bush News Conference with ROK President Roh Tae-Woo",
	  "Url": "https://www.upi.com/Archives/1992/01/07/Team-Spirit-joint-US-South-Korea-exercise-called-off/5381694760400/"
	},
	{
	  "Num": 2,
	  "Date": "1993-06-11T04:00:00.000Z",
	  "Administration": "William J. Clinton",
	  "Statement": "“The Democratic People’s Republic of Korea and the United States have agreed to principles of: - Assurances against the threat and use of force, including nuclear weapons; - Peace and security in a nuclear-free Korean Peninsula, including impartial application of fullscope safeguards, mutual respect for each other’s sovereignty, and non-interference in each other’s internal affairs; and - Support for the peaceful reunification of Korea. In this context, the two Governments have agreed to continue dialogue on an equal and unprejudiced basis.”",
	  "Context": "1993 U.S.DPRK Joint Statement",
	  "Url": "https://nautilus.org/wp-content/uploads/2011/12/CanKor_VTK_1993_06_11_joint_statement_dprk_usa.pdf"
	},
	{
	  "Num": 3,
	  "Date": "1993-07-10T04:00:00.000Z",
	  "Administration": "William J. Clinton",
	  "Statement": "“We are seeking to prevent aggression, not to initiate it. And so long as North Korea abides by the U.N. charter and international non-proliferation commitments, it has nothing to fear from America.”",
	  "Context": "Presidential Address to the ROK National Assembly",
	  "Url": "https://1997-2001.state.gov/regions/eap/930710.html"
	},
	{
	  "Num": 4,
	  "Date": "1994-06-05T04:00:00.000Z",
	  "Administration": "William J. Clinton",
	  "Statement": "“I approached them in the spirit of peace… I would like to have a relationship with North Korea… But we are not trying to provoke North Korea. We are only asking them to do what they have already promised to do.”",
	  "Context": "President Clinton, CBS Interview",
	  "Url": "https://www.govinfo.gov/content/pkg/WCPD-1994-06-13/pdf/WCPD-1994-06-13-Pg1220.pdf"
	},
	{
	  "Num": 5,
	  "Date": "1994-06-22T04:00:00.000Z",
	  "Administration": "William J. Clinton",
	  "Statement": "“We also always kept the door open. We always said—I always said I did not seek a confrontation; I sought to give North Korea a way to become a part of the international community. I have sought other means of personally communicating to Kim Il Sung that the desires of the United States and the interests of the United States and the policy of the United States was to pursue a nonnuclear Korean Peninsula and to give North Korea a way of moving with dignity into the international community and away from an isolated path…”",
	  "Context": "Presidential Press Conference on North Korea",
	  "Url": "https://www.presidency.ucsb.edu/documents/remarks-and-exchange-with-reporters-north-korea"
	},
	{
	  "Num": 6,
	  "Date": "1994-10-21T04:00:00.000Z",
	  "Administration": "William J. Clinton",
	  "Statement": "“The U.S. will provide formal assurances to the DPRK, against the threat or use of nuclear weapons by the U.S.”",
	  "Context": "1994 U.S.-DPRK Agreed Framework",
	  "Url": "https://2001-2009.state.gov/t/ac/rls/or/2004/31009.htm"
	},
	{
	  "Num": 7,
	  "Date": "1996-04-17T04:00:00.000Z",
	  "Administration": "William J. Clinton",
	  "Statement": "“The four-party talks are simply a way of providing a framework within which the South and the North can ultimately agree on the terms of peace in the same way that the armistice talks provided that framework 43 years ago. And if the United States can play a positive role in that, we want to.”",
	  "Context": "President Clinton, News Conference with ROK President Kim Young-Sam",
	  "Url": "https://books.google.com/books?id=yCThAwAAQBAJ&pg=PA585&lpg=PA585&dq=%E2%80%9CThe+four-party+talks+are+simply+a+way+of+providing+a+framework+within+which+the+South+and+the+North+can+ultimately+agree+on+the+terms+of+peace+in+the+same+way+that+the+armistice+talks+provided+that+framework+43+years+ago.+And+if+the+United+States+can+play+a+positive+role+in+that,+we+want+to.%E2%80%9D&source=bl&ots=iDNUwGtrw1&sig=ACfU3U2vS8DvoTnWGZW9rmAw37UIo74ZWQ&hl=en&sa=X&ved=2ahUKEwiutcuhhpf1AhUHrHIEHaZRCRUQ6AF6BAgCEAM#v=onepage&q=%E2%80%9CThe%20four-party%20talks%20are%20simply%20a%20way%20of%20providing%20a%20framework%20within%20which%20the%20South%20and%20the%20North%20can%20ultimately%20agree%20on%20the%20terms%20of%20peace%20in%20the%20same%20way%20that%20the%20armistice%20talks%20provided%20that%20framework%2043%20years%20ago.%20And%20if%20the%20United%20States%20can%20play%20a%20positive%20role%20in%20that%2C%20we%20want%20to.%E2%80%9D&f=false"
	},
	{
	  "Num": 8,
	  "Date": "1999-09-17T04:00:00.000Z",
	  "Administration": "William J. Clinton",
	  "Statement": "“Our policy of seeking to ease tensions, prevent destabilizing developments, and explore the possibilities of a different and better relationship with North Korea, are fully in accord with the positions of our allies. So is our staunch support for the Agreed Framework, which is the linchpin of our effort to end North Korea’s nuclear weapons program.”",
	  "Context": "Secretary of State Albright, North Korea Briefing",
	  "Url": "https://1997-2001.state.gov/statements/1999/990917a.html"
	},
	{
	  "Num": 9,
	  "Date": "2000-10-12T04:00:00.000Z",
	  "Administration": "William J. Clinton",
	  "Statement": "“Hostility between our two nations is not inevitable, nor desired by our citizens, nor in the interests of our countries… This is why we must seize the opportunity to take the concrete steps required to open a new and more hopeful chapter in our relations.’’",
	  "Context": "Secretary of State Albright, Speech at Dinner with North Korean official, Gen. Cho Myŏng-rok",
	  "Url": "https://1997-2001.state.gov/statements/2000/001010.html"
	},
	{
	  "Num": 10,
	  "Date": "2000-10-12T04:00:00.000Z",
	  "Administration": "William J. Clinton",
	  "Statement": "“[T]he United States and the Democratic People’s Republic of Korea have decided to take steps to fundamentally improve their bilateral relations in the interests of enhancing peace and security in the Asia-Pacific region . . . As a crucial first step, the two sides stated that neither government would have hostile intent toward the other and confirmed the commitment of both governments to make every effort in the future to build a new relationship free from past enmity. . . . In this regard, the two sides reaffirmed that their relations should be based on the principles of respect for each other’s sovereignty and non-interference in each other’s internal affairs, and noted the value of regular diplomatic contacts, bilaterally and in broader fora.”",
	  "Context": "2000 US-DPRK Joint Communiqué",
	  "Url": "https://1997-2001.state.gov/regions/eap/001012_usdprk_jointcom.html"
	},
	{
	  "Num": 11,
	  "Date": "2002-02-20T05:00:00.000Z",
	  "Administration": "George W. Bush",
	  "Statement": "“We’re a peaceful people. We have no intention of invading North Korea. South Korea has no intention of attacking North Korea. Nor does America. We’re purely defensive, and the reason we have to be defensive is because there is a threatening position of the DMZ, so we long for peace. It’s in our nation’s interest that we achieve peace on the peninsula.’’",
	  "Context": "President Bush, Joint News Conference with ROK President Kim Dae-Jung",
	  "Url": "https://www.nytimes.com/2002/02/20/world/bush-says-the-us-plans-no-attack-on-north-korea.html"
	},
	{
	  "Num": 12,
	  "Date": "2002-05-01T04:00:00.000Z",
	  "Administration": "George W. Bush",
	  "Statement": "“[The] president made it clear that we were willing to talk to them any time, any place, and without any preset agenda.’’",
	  "Context": "Secretary of State Powell, Senate Hearing",
	  "Url": "https://www.nytimes.com/2002/05/01/world/north-korea-is-prepared-to-negotiate-us-reports.html"
	},
	{
	  "Num": 13,
	  "Date": "2002-10-27T04:00:00.000Z",
	  "Administration": "George W. Bush",
	  "Statement": "“We have no intention of invading North Korea or taking hostile action against North Korea.”",
	  "Context": null,
	  "Url": "https://2001-2009.state.gov/secretary/former/powell/remarks/2002/14682.htm"
	},
	{
	  "Num": 14,
	  "Date": "2002-11-15T05:00:00.000Z",
	  "Administration": "George W. Bush",
	  "Statement": "“The United States hopes for a different future with North Korea. As I made clear during my visit to South Korea in February, the United States has no intention of invading North Korea. This remains the case today.’’",
	  "Context": "Presidential statement on the North Korean Nuclear Weapons Program",
	  "Url": "https://www.govinfo.gov/content/pkg/PPP-2002-book2/html/PPP-2002-book2-doc-pg2078.htm"
	},
	{
	  "Num": 15,
	  "Date": "2003-02-07T05:00:00.000Z",
	  "Administration": "George W. Bush",
	  "Statement": "“[We] have no intention of attacking North Korea as a nation… We’re prepared to talk to them.’’",
	  "Context": "Secretary of State Powell, Senate Foreign Relations Committee Testimony",
	  "Url": "https://www.nytimes.com/2003/02/06/international/powell-answers-questions-on-north-korea.html"
	},
	{
	  "Num": 16,
	  "Date": "2003-10-20T04:00:00.000Z",
	  "Administration": "George W. Bush",
	  "Statement": "“[What] [the President] himself has said, which is that there is no intention to invade North Korea. But the President is very committed to the six-party talks, believes that it is the forum in which we are most likely to get a satisfactory resolution of the nuclear problem on the Korean Peninsula. And so he reiterated the importance of moving those talks forward. . . . We are not going to go in, all guns blazing, say take it or leave it, this is it.”",
	  "Context": "National Security Adviser C. Rice, Press Briefing",
	  "Url": "https://georgewbush-whitehouse.archives.gov/news/releases/2003/10/20031020-1.html"
	},
	{
	  "Num": 17,
	  "Date": "2003-10-27T05:00:00.000Z",
	  "Administration": "George W. Bush",
	  "Statement": "“The president has made it clear that he has no intention of invading North Korea or attacking North Korea.”",
	  "Context": "Secretary of State Powell, “Meet the Press”",
	  "Url": "https://www.nytimes.com/2003/10/27/world/north-korean-defector-plans-talks-in-us.html"
	},
	{
	  "Num": 18,
	  "Date": "2005-02-11T05:00:00.000Z",
	  "Administration": "George W. Bush",
	  "Statement": "“The North Koreans have been told by the president of the United States that the United States has no intention of attacking or invading North Korea.”",
	  "Context": "Secretary of State C. Rice, News Conference in Luxembourg",
	  "Url": "https://www.washingtonpost.com/archive/politics/2005/02/11/n-korea-declaration-draws-world-concern/5bc702c9-8b81-4ec3-8b1a-65de6628d2c4/"
	},
	{
	  "Num": 19,
	  "Date": "2005-07-12T04:00:00.000Z",
	  "Administration": "George W. Bush",
	  "Statement": "“Now that they’ve decided to return to the talks, let’s just remember that we have stated that this is a sovereign state, that we have no intention to attack it…”",
	  "Context": "Secretary of State C. Rice, SBS Interview in Seoul",
	  "Url": "https://2001-2009.state.gov/secretary/rm/2005/49533.htm"
	},
	{
	  "Num": 20,
	  "Date": "2005-09-15T04:00:00.000Z",
	  "Administration": "George W. Bush",
	  "Statement": "“The United States affirmed that it has no nuclear weapons on the Korean Peninsula and has no intention to attack or invade the DPRK with nuclear or conventional weapons…”",
	  "Context": "2005 Six-Party Talks Joint Statement",
	  "Url": "https://2001-2009.state.gov/r/pa/prs/ps/2005/53490.htm"
	},
	{
	  "Num": 21,
	  "Date": "2006-10-10T04:00:00.000Z",
	  "Administration": "George W. Bush",
	  "Statement": "“The United States of America doesn’t have any intention to attack North Korea or to invade North Korea… But the United States somehow, in a provocative way, trying to invade North Korea—it’s just not the case.”",
	  "Context": "Secretary of State C. Rice, CNN Interview with Wolf Blitzer",
	  "Url": "http://www.cnn.com/2006/WORLD/asiapcf/10/10/rice.korea/index.html"
	},
	{
	  "Num": 22,
	  "Date": "2006-10-11T04:00:00.000Z",
	  "Administration": "George W. Bush",
	  "Statement": "“The United States affirmed that we have no nuclear weapons on the Korean Peninsula. We affirmed that we have no intention of attacking North Korea. The United States remains committed to diplomacy. . . . But the United States’ message to North Korea and Iran and the people in both countries is that we have—we want to solve the issues peacefully.”",
	  "Context": "Presidential News Conference",
	  "Url": "http://www.cnn.com/2006/POLITICS/10/11/bush.transcript/index.html?irefnewssearch"
	},
	{
	  "Num": 23,
	  "Date": "2006-11-18T05:00:00.000Z",
	  "Administration": "George W. Bush",
	  "Statement": "“Our desire is to solve the North Korean issue peacefully. And as I’ve made clear in a speech as recently as two days ago in Singapore, that we want the North Korean leaders to hear that if it gives up its weapons—nuclear weapons ambitions, that we would be willing to enter into security arrangements with the North Koreans, as well as move forward new economic incentives for the North Korean people.”",
	  "Context": "President Bush, Meeting with ROK President Roh Moo-Hyun",
	  "Url": "https://georgewbush-whitehouse.archives.gov/news/releases/2006/11/text/20061118-4.html"
	},
	{
	  "Num": 24,
	  "Date": "2008-06-26T04:00:00.000Z",
	  "Administration": "George W. Bush",
	  "Statement": "“First, I’m issuing a proclamation that lifts the provisions of the Trading with the Enemy Act with respect to North Korea. And secondly, I am notifying Congress of my intent to rescind North Korea’s designation as a state sponsor of terror in 45 days. The next 45 days will be an important period for North Korea to show its seriousness of its cooperation. We will work through the six-party talks to develop a comprehensive and rigorous verification protocol. And during this period, the United States will carefully observe North Korea’s actions—and act accordingly… Multilateral diplomacy is the best way to peacefully solve the nuclear issue with North Korea. Today’s developments show that tough multilateral diplomacy can yield promising results.”",
	  "Context": "Presidential Press Conference on North Korea",
	  "Url": "https://www.foxnews.com/story/transcript-bush-discusses-north-korean-nuclear-announcement.amp"
	},
	{
	  "Num": 25,
	  "Date": "2008-07-31T04:00:00.000Z",
	  "Administration": "George W. Bush",
	  "Statement": "“I will do nothing to undermine the sixparty structure, the credibility of the sixparty structure, and our partners.”",
	  "Context": "President Bush, Roundtable Interview By Foreign Print Media",
	  "Url": "https://georgewbush-whitehouse.archives.gov/news/releases/2008/07/20080731-7.html"
	},
	{
	  "Num": 26,
	  "Date": "2009-02-15T05:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "“Our position is when they move forward in presenting a verifiable and complete dismantling and denuclearization, we have a great openness to working with them… It’s not only on the diplomatic front… the United States [has] a willingness to help the people of North Korea, not just in narrow ways with food and fuel but with energy assistance.”",
	  "Context": "Secretary of State H. Clinton, En Route to Asia",
	  "Url": "https://www.nytimes.com/2009/02/16/washington/16diplo.html"
	},
	{
	  "Num": 27,
	  "Date": "2009-04-05T04:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "“The United States is fully committed to maintaining security and stability in northeast Asia and we will continue working for the verifiable denuclearization of the Korean Peninsula through the SixParty Talks. The Six-Party Talks provide the forum for achieving denuclearization, reducing tensions, and for resolving other issues of concern between North Korea, its four neighbors, and the United States.”",
	  "Context": "Presidential Statement on North Korea Launch",
	  "Url": "https://obamawhitehouse.archives.gov/the-press-office/statement-president-north-korea-launch"
	},
	{
	  "Num": 28,
	  "Date": "2009-04-05T04:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "“The United States and the European Union stand ready to work with others in welcoming into the international community a North Korea that abandons its pursuit of weapons of mass destruction and policy of threats aimed at its neighbors and that protects the rights of its people. Such a North Korea could share in the prosperity and development that the remainder of northeast Asia has achieved in recent years.”",
	  "Context": "U.S.-European Council Joint Statement",
	  "Url": "https://obamawhitehouse.archives.gov/the-press-office/united-states-european-council-joint-statement-north-korean-launch"
	},
	{
	  "Num": 29,
	  "Date": "2009-06-16T04:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "“So I want to be clear that there is another path available to North Korea—a path that leads to peace and economic opportunity for the people of North Korea, including full integration into the community of nations. That destination can only be reached through peaceful negotiations that achieve the full and verifiable denuclearization of the Korean peninsula. That is the opportunity that exists for North Korea, and President Lee and I join with the international community in urging the North Koreans to take it… We are more than willing to engage in negotiations to get North Korea on a path of peaceful coexistence with its neighbors, and we want to encourage their prosperity.”",
	  "Context": "President Obama, Joint Press Availability with ROK President Lee Myung-Bak",
	  "Url": "https://obamawhitehouse.archives.gov/the-press-office/remarks-president-obama-and-president-lee-republic-korea-joint-press-availability"
	},
	{
	  "Num": 30,
	  "Date": "2009-11-14T05:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "“Yet there is another path that can be taken. Working in tandem with our partners—supported by direct diplomacy—the United States is prepared to offer North Korea a different future. Instead of an isolation that has compounded the horrific repression of its own people, North Korea could have a future of international integration. Instead of gripping poverty, it could have a future of economic opportunity—where trade and investment and tourism can offer the North Korean people the chance at a better life. And instead of increasing insecurity, it could have a future of greater security and respect.”",
	  "Context": "President Obama, Tokyo, Japan",
	  "Url": "https://obamawhitehouse.archives.gov/the-press-office/remarks-president-barack-obama-suntory-hall"
	},
	{
	  "Num": 31,
	  "Date": "2009-11-19T05:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "“Our message is clear: If North Korea is prepared to take concrete and irreversible steps to fulfill its obligations and eliminate its nuclear weapons program, the United States will support economic assistance and help promote its full integration into the community of nations. That opportunity and respect will not come with threats— North Korea must live up to its obligations.”",
	  "Context": "President Obama, Joint Press Conference with ROK President Lee, Seoul",
	  "Url": "https://obamawhitehouse.archives.gov/the-press-office/remarks-president-barack-obama-and-president-lee-myung-bak-republic-korea-joint-pre"
	},
	{
	  "Num": 32,
	  "Date": "2010-11-11T05:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "“I want to reiterate that along with our South Korean and international partners, the United States is prepared to provide economic assistance to North Korea and help it integrate into the international community, provided that North Korea meets its obligations.”",
	  "Context": "President Obama, Joint Press Conference with ROK President Lee, Seoul",
	  "Url": "https://obamawhitehouse.archives.gov/the-press-office/2010/11/11/president-conference-with-president-obama-and-president-lee-republic-kor"
	},
	{
	  "Num": 33,
	  "Date": "2011-10-13T04:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "\"If the North abandons its quest for nuclear weapons and moves toward denuclearization, it will enjoy greater security and opportunity for its people. That's the choice that North Korea faces.\"",
	  "Context": "President Obama, Joint Press Conference with ROK President Lee, Washington D.C.",
	  "Url": "https://obamawhitehouse.archives.gov/the-press-office/2011/10/13/remarks-president-obama-and-president-lee-republic-korea-joint-press-con"
	},
	{
	  "Num": 34,
	  "Date": "2012-03-26T04:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "\"Here in Korea, I want to speak directly to the leaders in Pyongyang. The United States has no hostile intent toward your country. We are committed to peace. And we are prepared to take steps to improve relations, which is why we have offered nutritional aid to North Korean mothers and children.\"",
	  "Context": "President Obama, Remarks at Hankuk University of Foreign Studies",
	  "Url": "https://obamawhitehouse.archives.gov/the-press-office/2012/03/26/remarks-president-obama-hankuk-university"
	},
	{
	  "Num": 35,
	  "Date": "2012-11-19T05:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "\"To the leadership of North Korea, I have offered a choice: let go of your nuclear weapons and choose the path of peace and progress. If you do, you will find an extended hand from the United States of America.\"",
	  "Context": "President Obama, Remarks at the University of Yangon",
	  "Url": "https://obamawhitehouse.archives.gov/the-press-office/2012/11/19/remarks-president-obama-university-yangon"
	},
	{
	  "Num": 36,
	  "Date": "2013-02-12T05:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "\"The regime in North Korea must know they will only achieve security and prosperity by meeting their international obligations.\"",
	  "Context": "President Obama, Remarks in the State of Union Address",
	  "Url": "https://obamawhitehouse.archives.gov/the-press-office/2013/02/12/remarks-president-state-union-address"
	},
	{
	  "Num": 37,
	  "Date": "2013-04-11T04:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "\"[W]e both agree that now is the time for North Korea to end the kind of belligerent approach that they’ve been taking, and to try to lower temperatures -- nobody wants to see a conflict on the Korean Peninsula.\"",
	  "Context": "President Obama, Remarks after meeting with UN Secretary Gerneral Ban Ki-moon",
	  "Url": "https://obamawhitehouse.archives.gov/the-press-office/2013/04/11/remarks-president-obama-and-un-secretary-general-ban-ki-moon-after-meeti"
	},
	{
	  "Num": 38,
	  "Date": "2013-04-12T04:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "\"Our preference would be to get to talks. Our preference would be, through these Six-Party or through bilateral means, get to a place where we are talking about the real future, which is the future of denuclearizing and...ultimately, the reunification of the peninsula as a peaceful, nonnuclear entity...President Obama ordered a number of exercises not to be undertaken. I think we have lowered our rhetoric significantly, and we are attempting to find a way for reasonableness to prevail here.\"",
	  "Context": "Secretary of State John Kerry, Remarks after meeting with ROK Foreign Minister Yun Byung-se",
	  "Url": "https://2009-2017.state.gov/secretary/remarks/2013/04/207427.htm"
	},
	{
	  "Num": 39,
	  "Date": "2013-05-07T04:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "\"Our two nations are prepared to engage with North Korea diplomatically and, over time, build trust...we remain open to the prospect of North Korea taking a peaceful path of denuclearization, abiding by international commitments, rejoining the international community, and seeing a gradual progression in which both security and prosperity for the people of North Korea can be achieved. If what North Korea has been doing has not resulted in a strong, prosperous nation, then now is a good time for Kim Jong-un to evaluate that history and take a different path. And I think that, should he choose to take a different path, not only President Park and myself would welcome it, but the international community as a whole would welcome it.\"",
	  "Context": "President Obama, Joint Press Conference with ROK President Park Geun-hye, The White House",
	  "Url": "https://obamawhitehouse.archives.gov/the-press-office/2013/05/07/remarks-president-obama-and-president-park-south-korea-joint-press-confe"
	},
	{
	  "Num": 40,
	  "Date": "2013-07-19T04:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "\"North Korea can have peace and prosperity like the rest of the region, but only without nuclear weapons. North Korea has a clear choice: It can choose a better path for its people, or continue down the road they’re on. Make no mistake about it, though. We are open to engaging with any nation that’s prepared to live up to its international obligations.\"",
	  "Context": "Vice President Joe Biden, Remarks on Asia-Pacific policy at George Washington University",
	  "Url": "https://obamawhitehouse.archives.gov/the-press-office/2013/07/19/remarks-vice-president-joe-biden-asia-pacific-policy"
	},
	{
	  "Num": 41,
	  "Date": "2013-11-21T05:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "\"To that end, we are prepared for negotiations, provided that they are authentic and credible, get at the entirety of the North's nuclear program, and result in concrete and irreversible steps toward denuclearization.\"",
	  "Context": "National Security Advisor Susan E. Rice, Remarks at Georgetown University",
	  "Url": "https://obamawhitehouse.archives.gov/the-press-office/2013/11/21/remarks-prepared-delivery-national-security-advisor-susan-e-rice"
	},
	{
	  "Num": 42,
	  "Date": "2013-12-06T05:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "\"We are prepared to go back to six-party talks when North Korea demonstrates its full commitment to complete, verifiable, irreversible denuclearization. The simple fact is this: North Korea can never achieve security and prosperity so long as it pursues nuclear weapons -- period. But this is about more than weapons. We will never forget that Koreans –- North and South -– are one people, equally deserving to be treated with dignity.",
	  "Context": "Vice President Joe Biden, Remarks on U.S.-Korea Relations and the Asia-Pacific at Yonsei University",
	  "Url": "https://obamawhitehouse.archives.gov/the-press-office/2013/12/06/remarks-vice-president-joe-biden-us-korea-relations-and-asia-pacific"
	},
	{
	  "Num": 43,
	  "Date": "2014-04-26T04:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "\"So like all nations on Earth, North Korea and its people have a choice. They can choose to continue down a lonely road of isolation, or they can choose to join the rest of the world and seek a future of greater opportunity, and greater security, and greater respect -- a future that already exists for the citizens on the southern end of the Korean Peninsula. If they choose this path, America and the Republic of Korea and the rest of the world will help them build that future.",
	  "Context": "President Obama, Remarks to U.S. troops and personnel at U.S. Army Garrison Yongsan",
	  "Url": "https://obamawhitehouse.archives.gov/the-press-office/2014/04/26/remarks-president-obama-us-troops-and-personnel-us-army-garrison-yongsan"
	},
	{
	  "Num": 44,
	  "Date": "2014-07-30T04:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "\"We seek a solution to the North Korea nuclear challenge through peaceful, persistent, multilateral diplomacy. The United States has offered — and continues to offer — Pyongyang an improved bilateral relationship provided it takes action to demonstrate a willingness to fulfill its denuclearization commitments and address other important concerns which are also, we believe, shared by the international community.\"",
	  "Context": "Department of State Special Representative for North Korea Glyn Davies, Statement before the Subcommittee on Asia and the Pacific of the House Committee on Foreign Affairs",
	  "Url": "https://2009-2017.state.gov/p/eap/rls/rm/2014/07/229936.htm"
	},
	{
	  "Num": 45,
	  "Date": "2014-11-10T05:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "\"[I]f North Korea becomes serious about denuclearization on the Peninsula and is prepared to have a conversation around that topic, then the United States is going to be very open to trying to arrive at a solution that over the long term could lead to greater prosperity and security for North Korea.\"",
	  "Context": "President Obama, Remarks after bilateral meeting with Australian Prime Minister Tony Abbot",
	  "Url": "https://obamawhitehouse.archives.gov/the-press-office/2014/11/10/remarks-president-obama-and-prime-minister-abbott-australia-after-bilate"
	},
	{
	  "Num": 46,
	  "Date": "2015-01-13T05:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "\"The United States has offered – and continues to offer – Pyongyang an improved bilateral relationship provided it takes action to demonstrate a willingness to fulfill its denuclearization commitments and address other important concerns which are also shared by the international community. We seek credible and authentic negotiations to bring the DPRK into compliance with its denuclearization obligations. We have made clear to the DPRK that the door is open to meaningful engagement.\"",
	  "Context": "Special Representative for North Korea Policy Sung Kim, Testimony before House Foreign Affairs Committee",
	  "Url": "https://2009-2017.state.gov/p/eap/rls/rm/2015/01/235888.htm"
	},
	{
	  "Num": 47,
	  "Date": "2015-05-27T04:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "\"I think they understand that we are willing to engage them in a serious and sincere discussion about the nuclear issue. We have made that point very clear to them publicly, but also privately through the New York channel.\"",
	  "Context": "Special Representative for North Korea Policy Sung Kim, Remarks to the reporters, Seoul",
	  "Url": "https://2009-2017.state.gov/p/eap/rls/rm/2015/05/242910.htm"
	},
	{
	  "Num": 48,
	  "Date": "2015-10-16T04:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "\"We reaffirm our commitment to our common goal, shared by the international community, to achieve the complete, verifiable, and irreversible denuclearization of North Korea in a peaceful manner...The United States and the Republic of Korea maintain no hostile policy towards North Korea and remain open to dialogue with North Korea to achieve our shared goal of denuclearization.\"",
	  "Context": "2015 U.S.-ROK Joint Statement on North Korea",
	  "Url": "https://obamawhitehouse.archives.gov/the-press-office/2015/10/16/united-states-republic-korea-joint-statement-north-korea"
	},
	{
	  "Num": 49,
	  "Date": "2015-10-16T04:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "\"[W]e’re interested in seeing relief from sanctions and improved relations, and we are prepared to have a serious conversation about denuclearization -- I think it’s fair to say we’ll be right there at the table.\"",
	  "Context": "President Obama, Joint Press Conference with ROK President Park, The White House",
	  "Url": "https://obamawhitehouse.archives.gov/the-press-office/2015/10/16/remarks-president-obama-and-president-park-republic-korea-joint-press"
	},
	{
	  "Num": 50,
	  "Date": "2015-10-20T04:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "\"We also have made clear to North Korea that the path of engagement and credible negotiations remains open.\"",
	  "Context": "Special Representative for North Korea Policy Sung Kim, Testimony before Senate Foreign Relations Committee",
	  "Url": "https://2009-2017.state.gov/p/eap/rls/rm/2015/10/248373.htm"
	},
	{
	  "Num": 51,
	  "Date": "2016-04-04T04:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "\"[T]he record makes it clear that the United States has consistently made a good faith effort to reach a denuclearization deal through diplomacy. We have always accepted that there would be give and take in a settlement and that legitimate concerns of the DPRK would need to be addressed. We want a negotiated solution!...We have not walked back on our willingness to provide assurances and assistance to North Korea: with progress toward denuclearization we can promote economic cooperation and build a permanent peace.\"",
	  "Context": "Assistant Secretary of State Daniel R. Russel, Remarks at the Institute for Corean-American Studies",
	  "Url": "https://2009-2017.state.gov/p/eap/rls/rm/2016/04/255492.htm"
	},
	{
	  "Num": 52,
	  "Date": "2016-05-03T04:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "\"[W]e support the peaceful reunification of the Korean Peninsula and, in the meantime, seek a better life for all the Korean people. That’s why we have tried to reduce the suffering of the North Korean people where we can.\"",
	  "Context": "Assistant Secretary of State Daniel R. Russel, Remarks at the JoongAng Ilbo-CSIS Forum 2016",
	  "Url": "https://2009-2017.state.gov/p/eap/rls/rm/2016/05/256815.htm"
	},
	{
	  "Num": 53,
	  "Date": "2016-09-06T04:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "\"[I]f it is willing to recognize its international obligations and the importance of denuclearization in the Korean Peninsula, the opportunities for us to dialogue with them are there. And we do not have any interest in an offensive approach to North Korea. We want peace and security for all peoples.\"",
	  "Context": "President Obama, Remarks after bilateral meeting with ROK President Park, Vientiane Laos",
	  "Url": "https://obamawhitehouse.archives.gov/the-press-office/2016/09/06/remarks-president-obama-and-president-park-republic-korea-after"
	},
	{
	  "Num": 54,
	  "Date": "2016-10-27T04:00:00.000Z",
	  "Administration": "Barack H. Obama",
	  "Statement": "\"At the same time, we continue to make clear to the North that we are ready at any time to engage in credible negotiations on denuclearization and to offer a path to security, prosperity, and respect.\"",
	  "Context": "Deputy Secretary of State Antony J. Blinken, Remarks at U.S.-Japan-ROK Trilateral Press Conference",
	  "Url": "https://2009-2017.state.gov/s/d/2016d/263894.htm"
	},
	{
	  "Num": 55,
	  "Date": "2017-04-28T04:00:00.000Z",
	  "Administration": "Donald J. Trump",
	  "Statement": "\"Our goal is not regime change. Nor do we desire to threaten the North Korean people or destabilize the Asia Pacific region. Over the years, we have withdrawn our own nuclear weapons from South Korea and offered aid to North Korea as proof of our intent to de-escalate the situation and normalize relations. Since 1995, the United States has provided over $1.3 billion dollars in aid to North Korea, and we look forward to resuming our contributions once the D.P.R.K. begins to dismantle its nuclear weapons and missile technology programs.\"",
	  "Context": "Secretary of State Rex Tillerson, Remarks at the UN Security Council Ministerial Session on DPRK",
	  "Url": "https://2017-2021.state.gov/remarks-at-the-united-nations-security-council-ministerial-session-on-d-p-r-k/index.html"
	},
	{
	  "Num": 56,
	  "Date": "2017-12-15T05:00:00.000Z",
	  "Administration": "Donald J. Trump",
	  "Statement": "\"We have been clear that all options remain on the table in the defense of our nation, but we do not seek, nor do we want, war with North Korea.\"",
	  "Context": "Secretary of State Rex Tillerson, Remarks at the UN Security Council Ministerial Meeting on DPRK",
	  "Url": "https://2017-2021.state.gov/remarks-at-the-un-security-council-ministerial-meeting-on-d-p-r-k/index.html"
	},
	{
	  "Num": 57,
	  "Date": "2018-05-17T04:00:00.000Z",
	  "Administration": "Donald J. Trump",
	  "Statement": "\"Well, the Libyan model isn't a model that we have at all, when we're thinking of North Korea. In Libya, we decimated that country. That country was decimated. There was no deal to keep Gadhafi. The Libyan model that was mentioned was a much different deal. This would be with Kim Jong-un -- something where he'd be there, he'd be in his country, he'd be running his country. His country would be very rich. His people are tremendously industrious.\"",
	  "Context": "President Trump, Remarks in the press conference",
	  "Url": "https://www.msnbc.com/rachel-maddow-show/trump-scrambles-tell-north-korea-what-it-wants-hear-msna1102996"
	},
	{
	  "Num": 58,
	  "Date": "2018-06-01T04:00:00.000Z",
	  "Administration": "Donald J. Trump",
	  "Statement": "\"Q When you say you’re going to guarantee Kim’s security, and the North Korean regime’s security, how will you do that? How would the United States do that? THE PRESIDENT: Well, we’re going to make sure it’s secure. We’re going to make sure when this is over, it’s over. It’s not going to be starting up again. And they have a potential to be a great country.\"",
	  "Context": "President Trump, Remarks after meeting with DPRK Vice Chairman Kim Yong Chol, White House",
	  "Url": "https://trumpwhitehouse.archives.gov/briefings-statements/remarks-president-trump-meeting-vice-chairman-kim-yong-chol-democratic-peoples-republic-korea/"
	},
	{
	  "Num": 59,
	  "Date": "2018-06-07T04:00:00.000Z",
	  "Administration": "Donald J. Trump",
	  "Statement": "\"President Trump recognizes North Korea’s desire for security and is prepared to ensure a DPRK free of its weapons of mass destruction is also a secure North Korea. President Trump has made it clear that if Kim Jong Un denuclearizes, there is a brighter path for North Korea and its people. We envision a strong, connected, secure, and prosperous North Korea that is integrated into the community of nations. We think that the people of the United States and North Korea can create a future defined by friendship and collaboration, and not by mistrust and fear.\"",
	  "Context": "Secretary of State Mike Pompeo, Press briefing",
	  "Url": "https://trumpwhitehouse.archives.gov/briefings-statements/press-briefing-secretary-state-mike-pompeo-060718/"
	},
	{
	  "Num": 60,
	  "Date": "2018-06-12T04:00:00.000Z",
	  "Administration": "Donald J. Trump",
	  "Statement": "\"President Trump committed to provide security guarantees to the DPRK, and Chairman Kim Jong Un reaffirmed his firm and unwavering commitment to complete denuclearization of the Korean Peninsula.\"",
	  "Context": "Joint Statement of President Donald J. Trump of the United States of America and Chairman Kim Jong Un of the Democratic People’s Republic of Korea at the Singapore Summit",
	  "Url": "https://trumpwhitehouse.archives.gov/briefings-statements/joint-statement-president-donald-j-trump-united-states-america-chairman-kim-jong-un-democratic-peoples-republic-korea-singapore-summit/"
	},
	{
	  "Num": 61,
	  "Date": "2018-06-12T04:00:00.000Z",
	  "Administration": "Donald J. Trump",
	  "Statement": "\"There is no limit to what North Korea can achieve when it gives up its nuclear weapons and embraces commerce and engagement with the rest of the world — that really wants to engage. Chairman Kim has before him an opportunity like no other: to be remembered as the leader who ushered in a glorious new era of security and prosperity for his people.\"",
	  "Context": "President Trump, Press Conference after Singapore Summit with DPRK Kim Jong-un",
	  "Url": "https://www.ncnk.org/resources/publications/singapore_summit_press_conference.pdf/file_view"
	},
	{
	  "Num": 62,
	  "Date": "2018-07-08T04:00:00.000Z",
	  "Administration": "Donald J. Trump",
	  "Statement": "\"[W]e have been very clear there were three parts of the agreement in the Singapore summit. There were the establishment of peaceful relations between the countries, increased security assurances to North Korea and its people, and finally, denuclearization. Each of those needs to be conducted in parallel. We need to work on those efforts simultaneously. And so it is absolutely the case that there are places where there will be things that take place along the way that help achieve the security assurances that the North Koreans need and improvement in the peaceful relations between our two countries during the time that denuclearization is taking place.\"",
	  "Context": "Secretary of State Mike Pompeo, Remarks to the Press with ROK Foreign Minister Kan Kyung-wha and Japanese Foreign Minister Kono Taro",
	  "Url": "https://2017-2021.state.gov/secretary-of-state-michael-r-pompeo-japanese-foreign-minister-taro-kono-and-south-korean-foreign-minister-kang-kyung-wha-at-a-press-availability/index.html"
	},
	{
	  "Num": 63,
	  "Date": "2018-09-27T04:00:00.000Z",
	  "Administration": "Donald J. Trump",
	  "Statement": "\"The United States continues to engage with North Korea to implement the commitments made in Singapore...President Trump has made abundantly clear that if Chairman Kim follows through on his commitments, a much brighter future lies ahead for North Korea and its people, and the United States will be at the forefront of facilitating that bright future. We want to see that time come as quickly as possible. But the path to peace and a brighter future is only through diplomacy and only denuclearization.\"",
	  "Context": "Secretary of State Mike Pompeo, Remarks at a meeting on Democratic People's Republic of Korea",
	  "Url": "https://2017-2021.state.gov/remarks-at-a-meeting-on-the-democratic-peoples-republic-of-korea/index.html"
	},
	{
	  "Num": 64,
	  "Date": "2019-01-31T05:00:00.000Z",
	  "Administration": "Donald J. Trump",
	  "Statement": "\"President Trump is ready to end this war. It is over. It is done. We are not going to invade North Korea. We are not seeking to topple the North Korean regime. We need to advance our diplomacy alongside our plans for denuclearization in a manner that sends that message clearly to North Korea as well. We are ready for a different future. It’s bigger than denuclearization, while it stands on the foundation of denuclearization, but that’s the opportunity we have and those are the discussions we will be having with the North Koreans.\"",
	  "Context": "Special Representative for North Korea Stephen Biegun's comments at Stanford University talk",
	  "Url": "https://kr.usembassy.gov/013119-remarks-on-dprk-at-stanford-university/"
	},
	{
	  "Num": 65,
	  "Date": "2019-02-27T05:00:00.000Z",
	  "Administration": "Donald J. Trump",
	  "Statement": "\"And as I’ve said many times — and I say it to the press, I say it to anybody that wants to listen: I think that your country has tremendous economic potential. Unbelievable. Unlimited. And I think that you will have a tremendous future with your country — a great leader. And I look forward to watching it happen and helping it to happen. And we will help it to happen.\"",
	  "Context": "President Trump, Remarks before dinner with DPRK Kim Jong-un in Hanoi",
	  "Url": "https://trumpwhitehouse.archives.gov/briefings-statements/remarks-president-trump-chairman-kim-jong-un-democratic-peoples-republic-korea-11-conversation-hanoi-vietnam/"
	},
	{
	  "Num": 66,
	  "Date": "2019-02-28T05:00:00.000Z",
	  "Administration": "Donald J. Trump",
	  "Statement": "\"And frankly, I think we’ll end up being very good friends with Chairman Kim and with North Korea, and I think they have tremendous potential. I’ve been telling everybody: They have tremendous potential. Unbelievable potential. But we’re going to see.\"",
	  "Context": "President Trump, Press Conference after Hanoi Summit with DPRK Kim Jong-un",
	  "Url": "https://trumpwhitehouse.archives.gov/briefings-statements/remarks-president-trump-press-conference-hanoi-vietnam/"
	},
	{
	  "Num": 67,
	  "Date": "2019-12-16T05:00:00.000Z",
	  "Administration": "Donald J. Trump",
	  "Statement": "\"In their statements, much has been said about North Korea’s end of the year deadline. On this point, let me absolutely clear: the United States does not have a deadline, we have a goal—to fulfill the commitments the two leaders made during their historic summit in Singapore...At the President’s direction, our team remains prepared to engage with our counterparts in North Korea to achieve that goal.\"",
	  "Context": "Special Representatives for North Korea Stephen Biegun, Remarks to the Press in Seoul",
	  "Url": "https://2017-2021.state.gov/remarks-to-the-press-by-stephen-biegun/index.html"
	},
	{
	  "Num": 68,
	  "Date": "2020-07-15T04:00:00.000Z",
	  "Administration": "Donald J. Trump",
	  "Statement": "\"In June of 2018, in Singapore, Chairman Kim and President Trump met and they laid down a broad set of objectives that were agreed to – not only denuclearization of the Korean Peninsula with a fully verified mechanism to ensure that that had taken place, but also prosperity for the North Korean people, a security situation for both North and South Korea that was satisfactory to each of them as well.\"",
	  "Context": "Secretary of State Mike Pompeo, Remarks to the economic Club of New York",
	  "Url": "https://2017-2021.state.gov/remarks-to-the-economic-club-of-new-york/index.html"
	},
	{
	  "Num": 69,
	  "Date": "2020-12-10T05:00:00.000Z",
	  "Administration": "Donald J. Trump",
	  "Statement": "\"We have made clear from the very beginning that security guarantees and sanctions relief were and are topics which could be advanced if North Korea is in turn ready to make progress on denuclearization. As I have said from the beginning, we do not expect North Korea to do everything before we do anything, nor should North Korea expect such an outcome from us. But, we must agree to lay out a roadmap for action, and we must agree on where that roadmap ultimately leads.\"",
	  "Context": "Deputy Secretary of state Stephen Biegun, Remarks at Asan Institute, Seoul",
	  "Url": "https://2017-2021.state.gov/the-future-of-the-united-states-and-the-korean-peninsula/index.html"
	},
	{
	  "Num": 70,
	  "Date": "2021-05-21T04:00:00.000Z",
	  "Administration": "Biden",
	  "Statement": "\"President Biden also expresses his support for inter-Korean dialogue, engagement, and cooperation. We agree to work together to improve the human rights situation in the DPRK and commit to continue facilitating the provision of humanitarian aid to the neediest North Koreans. We also share our willingness to help facilitate the reunion of separated families of the two Koreas. We also agree to coordinate our approaches to the DPRK in lockstep.",
	  "Context": null,
	  "Url": "https://www.whitehouse.gov/briefing-room/statements-releases/2021/05/21/u-s-rok-leaders-joint-statement/"
	},
	{
	  "Num": 71,
	  "Date": "2021-05-22T04:00:00.000Z",
	  "Administration": "Biden",
	  "Statement": "\"[I]f he made any commitment, then I would meet with him. And if there was a commitment on which we met — and the commitment has to be that there’s discussion about his nuclear arsenal, and if it’s merely an — a means by which how do we deescalate what they’re doing.\"",
	  "Context": null,
	  "Url": "https://www.whitehouse.gov/briefing-room/speeches-remarks/2021/05/21/remarks-by-president-biden-and-h-e-moon-jae-in-president-of-the-republic-of-korea-at-press-conference/"
	},
	{
	  "Num": 72,
	  "Date": "2021-08-23T04:00:00.000Z",
	  "Administration": "Biden",
	  "Statement": "“The United States does not have hostile intent toward DPRK...I continue to stand ready to meet with my North Korean counterparts anywhere, at anytime.”",
	  "Context": null,
	  "Url": "http://www.koreaherald.com/view.php?ud=20210823000845"
	},
	{
	  "Num": 73,
	  "Date": "2021-09-30T04:00:00.000Z",
	  "Administration": "Biden",
	  "Statement": "\"We remain open to engagement with the DPRK to discuss the full range of bilateral and regional issues. I want to make clear again that the United States harbors no hostile intent toward the DPRK..We are also prepared to work cooperatively with the DPRK to address areas of shared humanitarian concern.\"",
	  "Context": null,
	  "Url": "https://en.yna.co.kr/view/AEN20210930001352325"
	},
	{
	  "Num": 74,
	  "Date": "2021-10-24T04:00:00.000Z",
	  "Administration": "Biden",
	  "Statement": "\"We remain ready to meet with the DPRK without preconditions, and we have made clear that the United States harbors no hostile intent toward the DPRK. We hope the DPRK will respond positively to our outreach. We are also prepared to work cooperatively with the DPRK to address areas of humanitarian concern, to help the most vulnerable North Koreans.\"",
	  "Context": null,
	  "Url": "https://www.state.gov/remarks-to-the-press-by-ambassador-sung-kim-special-representative-for-north-korea/"
	},
	{
	  "Num": 75,
	  "Date": "2022-01-12T05:00:00.000Z",
	  "Administration": "Biden",
	  "Statement": "\"We remain committed to seeking dialogue and diplomacy with the DPRK and call on the DPRK to engage in negotiations.\"",
	  "Context": null,
	  "Url": "https://www.state.gov/united-states-designates-entities-and-individuals-linked-to-the-democratic-peoples-republic-of-koreas-dprk-weapons-programs/"
	}
  ];
//const json = JSON.parse(jsonObj);
init(jsonObj);
