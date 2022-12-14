import { IHike } from "../@types/hike";
import { IMountain } from "../@types/mountain";

export const test_hikes_with_duplicates: IHike[] = [
  {
    id: "testId1",
    hikeDate: "2019-10-10",
    hikers: "Test1, Test2",
    weather: "Test Weather",
    tripReport: "Test report1",
    userId: "testUserId",
    mountainId: 1,
  },
  {
    id: "testId2",
    hikeDate: "2018-10-10",
    hikers: "Test1, Test2",
    weather: "Test Weather",
    tripReport: "Test report2",
    userId: "testUserId",
    mountainId: 2,
  },
  {
    id: "testId3",
    hikeDate: "2018-10-10",
    hikers: "Test1, Test2",
    weather: "Test Weather",
    tripReport: "Test report3",
    userId: "testUserId",
    mountainId: 3,
  },
  {
    id: "testId4",
    hikeDate: "2018-10-10",
    hikers: "Test1, Test2",
    weather: "Test Weather",
    tripReport: "Test report4",
    userId: "testUserId",
    mountainId: 8,
  },
  {
    id: "testId5",
    hikeDate: "2018-08-10",
    hikers: "Test1, Test2",
    weather: "Test Weather",
    tripReport: "Test report5",
    userId: "testUserId",
    mountainId: 1,
  },
  {
    id: "testId6",
    hikeDate: "2018-10-10",
    hikers: "Test1, Test2",
    weather: "Test Weather",
    tripReport: "Test report6",
    userId: "testUserId",
    mountainId: 10,
  },
];

export const test_hikes_no_duplicates: IHike[] = [
  {
    id: "testId1",
    hikeDate: "2018-10-10",
    hikers: "Test1, Test2",
    weather: "Test Weather",
    tripReport: "Test report1",
    userId: "testUserId",
    mountainId: 1,
  },
  {
    id: "testId2",
    hikeDate: "2018-10-10",
    hikers: "Test1, Test2",
    weather: "Test Weather",
    tripReport: "Test report2",
    userId: "testUserId",
    mountainId: 2,
  },
  {
    id: "testId3",
    hikeDate: "2018-10-10",
    hikers: "Test1, Test2",
    weather: "Test Weather",
    tripReport: "Test report3",
    userId: "testUserId",
    mountainId: 3,
  },
  {
    id: "testId4",
    hikeDate: "2018-10-10",
    hikers: "Test1, Test2",
    weather: "Test Weather",
    tripReport: "Test report4",
    userId: "testUserId",
    mountainId: 8,
  },
  {
    id: "testId5",
    hikeDate: "2018-10-10",
    hikers: "Test1, Test2",
    weather: "Test Weather",
    tripReport: "Test report5",
    userId: "testUserId",
    mountainId: 9,
  },
  {
    id: "testId6",
    hikeDate: "2018-10-10",
    hikers: "Test1, Test2",
    weather: "Test Weather",
    tripReport: "Test report6",
    userId: "testUserId",
    mountainId: 10,
  },
];

export const test_mountain_data: IMountain[] = [
  {
    id: 1,
    name: "Mt. Marcy",
    elevation: 5344,
    difficulty: 5,
    ascent: 3166,
    length: 14.8,
    hikeTime: 10.0,
    description:
      "With an elevation of 5,344 feet above sea level, Mount Marcy is the highest peak in the Adirondacks and the highest mountain in New York State.\n\nThis remote peak is one of the most visited in the world. The trip to the top can be steep and wet and in the months from October to May expect snow towards the top of the peak.\n\nThe first ascent of Mt. Marcy was in 1837, but it wasn???t until 1861 that a trail was cut to the summit. The original trail was later abandoned for the route that is used today. Since then hikers from across the country have climbed to the top during both the winter and summer months. In the winter months, a majority of the trail is suitable for alpine skiing or snowboarding on the way back down.\n\nToday the most popular route to the top is the Van Hoevenberg Trail which goes northeast up the mountain. It is a 7.4 mile trek to the summit and is rated a level of difficulty of 5 out of 7. The path goes up along Mount Phelps until you reach the summit and then crosses over onto Mt. Marcy. \n\nWhen you arrive at the top of Mount Marcy you will see that the trek up was worth it. The view is spectacular! You can see the summits of 43 high peaks throughout the Adirondacks. On a clear day you can see Mount Royal in Montreal to the north, which is almost 65 miles away!\n\nThe Mount Marcy hike can be completed in a day, but some choose to hike a portion of the trail, pitch a tent for the night, and continue on the following day. There are campgrounds available for use at mile 3 of the trail.",
  },
  {
    id: 2,
    name: "Algonquin Peak",
    elevation: 5114,
    difficulty: 5,
    ascent: 2936,
    length: 9.6,
    hikeTime: 9.0,
    description:
      "Algonquin Peak is located in the Adirondacks' MacIntyre Range in the town of North Elba, NY. Algonquin is the second-highest mountain in New York State, and is one of the 46 Adirondack High Peaks.\n\nAlgonquin Peak boasts an elevation of 5,114', and the 8.6 mile round-trip hike to and from its summit is steep and challenging.\n\nThe primary trailhead for Algonquin Peak is located off of Route 73 in North Elba. Take Route 73 south out of Lake Placid, and continue until you reach Adirondack Loj Road (34) on your right. Follow Adirondack Loj Road all the way to the end, and you'll reach the Adirondack Loj & Heart Lake Program Center and parking area. Multiple trails begin at this point, so be sure to carefully follow markers for Algonquin.\n\nAspiring 46ers should note that trails for Wright Peak and Iroquois Peak branch off of the Algonquin trail, enabling expert hikers to summit all three in one day.\n\nThe last mile of the Algonquin Peak ascent is the most challenging, but hikers are rewarded with brilliant views from the open-rock summit. Be prepared for exposure to the elements, as the summit offers no protection above the tree line.",
  },
  {
    id: 3,
    name: "Mt. Haystack",
    elevation: 4960,
    difficulty: 7,
    ascent: 3570,
    length: 17.8,
    hikeTime: 12.0,
    description:
      "Standing at 4,960 feet, Mount Haystack is the third tallest mountain in New York State. Its bald summit offers incredible views of the Adirondacks.\n\nMount Haystack gets its name from its unique shape that resembles a stack of hay. It is a less popular peak due to its extremely challenging climb. Many hikers who summit Mount Haystack are aspiring members of the Adirondack Forty-Sixers.  \n\nTo reach Mount Haystack, many hikers follow the Johns Brook Trail from the Garden Parking area in Keene Valley to the Phelps Trail and then use the Shorey???s Short Cut to get over the Range trail.\n\nAnother hiking option would be to come along the Great Range itself and hike Mount Haystack before Mount Marcy???or combine the hike with the neighboring mountains Basin and Saddleback.\n\nMount Haystack has what hikers call ???Devil???s Half Mile,??? the stretch of the hike that has extremely steep terrain.  Make sure you???re careful!\n\nThe average trip length is 17.8 miles and will take experienced hikers roughly 12 hours to complete. Rated a 7 out of 7 on our difficulty scale, be sure you have plenty of hiking experience under your belt before tackling this mountain.",
  },
  {
    id: 4,
    name: "Mt. Skylight",
    elevation: 4926,
    difficulty: 7,
    ascent: 4265,
    length: 17.9,
    hikeTime: 15.0,
    description:
      "The fourth highest mountain in New York State, Mount Skylight has an elevation of 4,926 ft and a long approach, making this best suited for more experienced hikers.\n\nMount Skylight gets its name from the open, bare and flat summit???perfect for gazing up into the sky! This high peak is a favorite among hikers and is known for its two large cairns.  What is a cairn?  A cairn is a man-made pile of stones ??? there are two used to mark the summit of Mount Skylight. \n\nThe hike to Mount Sklyight is a 14.2 mile round-trip, or can be extended further if combined with Gray Peak and Mount Marcy. Depending on your speed and experience, it could take you 10 - 15 hours to hike.\n\nA single trail goes up to the mountain???s summit from the Four Corners Junction, between Mount Skylight and Mount Marcy. The most popular way to get to the summit is for hikers to come up from the west on the Fledspar Brook Trail and climb the peak in conjunction with a visit to the Lake-Tear-of-the Clouds.  This lake is the highest source of the Hudson River.  From there, you could opt to climb Gray Peak, another 46er. \n\nThe trail can also be reached by descending from Mount Marcy to the north, or Panther Gorge and Elk Lake to the southeast.  All of these hikes are extensive and are often done with an overnight camping stop.",
  },
  {
    id: 5,
    name: "Whiteface Mtn.",
    elevation: 4867,
    difficulty: 4,
    ascent: 2535,
    length: 10.4,
    hikeTime: 8.5,
    description:
      "Whiteface Mountain is the 5th highest mountain in New York State with an Elevation of 4,867 ft.\n\nThe length of the trip is about 10.4 miles and will take about 8.5 hours to hike. \n\nUnlike other High Peaks, Whiteface Mountain is accessible by motor vehicle???so if you???re not a great hiker, drive to the top of this beautiful mountain and check out the amazing view!  At the summit, Whiteface Mountain offers a 360-view of the Adirondacks, Vermont and Canada. \n\nWhiteface is located in Wilmington, New York, which is about 13 miles away from Lake Placid.  It is a popular skiing destination, with the highest vertical drop in the eastern United States of 3,430 feet, and was also home to the 1980 Winter Olympics.  ",
  },
  {
    id: 6,
    name: "Dix Mtn.",
    elevation: 4857,
    difficulty: 7,
    ascent: 2800,
    length: 13.2,
    hikeTime: 10.0,
    description:
      "Dix Mountain is the sixth-highest of the 46 Adirondack High Peaks with an elevation of 4,857 ft.\n\nA round-trip trek up and down Dix is about 13.2 miles long, and on average takes about 10 hours to hike. The hike is regarded as challenging and should not be attempted by children or beginners.\n\nDix Mountain is a gateway to four other High Peaks; Hough, Macomb, South Dix (Carson Peak) and Grace Peak (East Dix).\n\nThe best time to climb Dix Mountain is in the summer, because the trail can become very wet during other seasons. \n\nHikers most commonly use the Elk Lake Trailhead on Elk Lake Road. The trail leads hikers past the Slide Brook and Lillian Brook lean-to's.",
  },
  {
    id: 7,
    name: "Gray Peak",
    elevation: 4840,
    difficulty: 7,
    ascent: 4178,
    length: 16.0,
    hikeTime: 14.0,
    description:
      "Standing at 4,840 feet, Gray Peak is the 7th tallest Adirondack High Peak. It is located in Keene Valley, fairly close to Mount Marcy.\n\nGray Peak is named after famed American botanist, Asa Gray. It is the tallest mountain in the High Peaks without a maintained trail to the summit.\n\nThe hike is about 16 miles and will typically take 14 hours to climb round trip. Our experts rate this height a 7 on our difficulty scale, making it one of the more difficult peaks.\n\nMost hikers take a path leading from Lake Tear of the Clouds, but sometimes it is hard to find the trailhead. Note, there is a small cairnmarking the start of the herd path, so keep your eyes peeled!  If you're not into bushwhacking, you may want to rethink this journey.",
  },
  {
    id: 8,
    name: "Iroquois Peak",
    elevation: 4840,
    difficulty: 6,
    ascent: 3250,
    length: 11.6,
    hikeTime: 11.0,
    description:
      "Standing at 4840 feet, Iroquois Peak is the 8th tallest mountain in New York State & the Adirondack High Peaks.\n\nIroquois is part of the MacIntyre Range which also includes Wright and Algonquin. While the trail is a bit rocky, the summit offers incredible views of Indian Pass and Wallface Mountain.\n\nThe hike is about 11.6 miles long and will take 8.5 hours to climb. Our team of experts rate this hike a 6 out of 7 on our difficulty scale.\n\nThe easiest route for Iroquois Peak is from the Adirondack Loj and up to the Algonquin trail. Then, venture up and over the Algonquin Peak to the unmarked trail. As you make your way along the herd path, be mindful of the fragile ecosystem and endangered alpine plants along the path.",
  },
  {
    id: 9,
    name: "Basin Mtn.",
    elevation: 4827,
    difficulty: 6,
    ascent: 3650,
    length: 16.5,
    hikeTime: 11.0,
    description:
      "Basin Mountain is the 9th-highest of the Adirondack High Peaks with an elevation of 4,827 ft.\n\nThe round-trip hike is about 15 miles, and takes on average 11 hours to complete.\n\nThe Basin Mountain climb is difficult, and can get dangerous in certain weather conditions.\n\nBasin's summit is above the treeline and has amazing views of Mount Marcy, Haystack, Gothics, Saddleback, Big Slide and Dix. \n\nBasin is part of the Great Range, and can be reached via four different trailheads. Most hikers park at the Garden Parking Lot in Keene Valley and take the Phelps Trail to the Gothics/Saddleback trail junction. From there, hike west to Basin's summit.\n\n",
  },
  {
    id: 10,
    name: "Gothics",
    elevation: 4736,
    difficulty: 5,
    ascent: 4070,
    length: 10.0,
    hikeTime: 9.0,
    description:
      "Gothics Mountain is the 10th-highest of the 46 Adirondack High Peaks, with an elevation of 4,736 ft.\n\nDepending on the chosen route, the hike can be 15 miles round-trip, and can take up to 10 hours to complete. Gothics is not recommended for children or inexperienced hikers.\n\nThe primary trailhead is located at the St. Huberts Parking Area on the Adirondack Mountain Reserve (AMR). Note that dogs are not allowed on this private property.\n\nThe trail will lead you to Beaver Meadow Falls before it continues up a ladder to a steady incline with some steep spots. Several other ladders follow before the Range Trail junction where Gothics branches off to the left and Armstrong to the right.\n\nThe secondary route begins at The Garden in Keene Valley.\n\nHow did Gothics get its name? Gothics Mountain is covered with rock slides, resembling Gothic architecture, a style that flouished duirng the medieval times. \n\nA unique aspect of this mountain is that there are large fixed cables and ladders at certain points throughout the mountain. Take advantage of these points to avoid sliding down the mountain.\n\nA little known fact about Gothics Mountain is that at the top, there is a hidden cave.  Hike Gothics mountain and find it for yourself.",
  },
];
