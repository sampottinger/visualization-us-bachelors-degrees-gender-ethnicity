Visualization of US Bachelor's Degrees by Gender and Ethnic Diversity
=====================================================================
Using US Census data, this visualization examines the gender and ethnic trends behind college degrees and the outcomes for graduates. This analysis not only offers a raw insight into the number of degree holders, employment, and median income but also scales those numbers proportional to
 - the national populations of the overall gender and ethnic groups examined
 - the populations that achieved the same degrees

This allows users to determine not just how many men achieved a degree in Literature, for example, but what percent of men nation-wide hold that degree and what percent of all graduates in the field are male.

Note that **this is not an official Google product** and the views and opinions expressed here are those of the author and do not necessarily reflect the views of Google, its affiliates, or its employees. However, it was written, designed, and maintained by (now-ex) Googler [Sam Pottinger](http://gleap.org) (github: [samnsparky](https://github.com/Samnsparky)).


Technical stuff
---------------
**Getting it set up**
 - Clone the repository
 - Install [Bower](http://bower.io/)
 - Install dependencies ($ bower install)
 - Serve the directory (we tend to like Python, $ python -m SimpleHTTPServer)
 - Run the tests by navigating to localhost:port/test.html
 - View the visualization by opening localhost:port/disciplines_stats.html

Exchange "port" with the port your local server is running on.

**Getting framiliar with the dependencies**
 - [Bootstrap](http://getbootstrap.com/) ([MIT](https://github.com/twbs/bootstrap/blob/master/LICENSE), [Twitter](https://twitter.com)). [Docs for Bootstrap](http://getbootstrap.com/getting-started/).
 - [D3](http://d3js.org/) ([BSD 3-Clause](http://opensource.org/licenses/BSD-3-Clause), [Mike Bostock](http://bost.ocks.org/mike/)). [Docs for D3](https://github.com/mbostock/d3/wiki).
 - [Jasmine](http://jasmine.github.io/) ([MIT](https://github.com/jasmine/jasmine/blob/master/MIT.LICENSE), [Pivotal Labs](http://pivotallabs.com/)). [Docs for Jasmine](http://jasmine.github.io/2.1/introduction.html).
 - [jQuery](http://jquery.com/) ([MIT](https://jquery.org/license/), [jQuery Foundation](https://jquery.org/)). [Docs for jQuery](http://learn.jquery.com/).

**License**  
Copyright 2016 Sam Pottinger.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

Note that this is not an official Google product. The views and opinions expressed here are those of the author and do not necessarily reflect the views of Google, its affiliates, or its employees.

**Contributions**  
Great! We will have to ask you to agree to a contributor license agreement:
 - [Individual Agreement](https://cla.developers.google.com/about/google-individual)
 - [Corporate Agreement](https://developers.google.com/open-source/cla/corporate)


Humanities stuff
---------------
**Works cited?**  
Always.
 - Few, Stephen. "Coordinated Highlighting in Context" Visual Business Intelligence Newsletter (2010). July 2010. Web. 20 Dec. 2014.
 - "INDUSTRY BY SEX AND MEDIAN EARNINGS IN THE PAST 12 MONTHS (IN 2011 INFLATION-ADJUSTED DOLLARS) FOR THE FULL-TIME, YEAR-ROUND CIVILIAN EMPLOYED POPULATION 16 YEARS AND OVER 2007-2011 American Community Survey 5-Year Estimates." American FactFinder. US Census Bureau. Web. 20 Dec. 2014.
 - "Parallel Coordinates." Wikipedia. Wikimedia Foundation. Web. 20 Dec. 2014.
 - Rao, Ramana, and Stuart K. Card. "The Table Lens: Merging Graphical and Symbolic Representations in an Interactive Focus+context Visualization for Tabular Information." CHI '94 Conference Companion on Human Factors in Computing Systems: 222. ACM Digital Library. ACM. Web. 20 Dec. 2014.
 - Ryan, Camille. "Field of Degree and Earnings by Selected Employment Characteristics: 2011." American Community Survey Briefs (2012). Oct. 2012. Web. 20 Dec. 2014.
 - "Sankey Diagram." Wikipedia. Wikimedia Foundation. Web. 20 Dec. 2014.
 - "Sankey or Harness?" The Economist. The Economist Newspaper, 04 July 2011. Web. 20 Dec. 2014.
 - "SEX BY AGE (ASIAN ALONE) Universe: People Who Are Asian Alone 2008-2012 American Community Survey 5-Year Estimates." American FactFinder - US Census Bureau. US Census Bureau. Web. 20 Dec. 2014.
 - "SEX BY AGE (BLACK OR AFRICAN AMERICAN ALONE) Universe: People Who Are Black or African American Alone 2008-2012 American Community Survey 5-Year Estimates." American FactFinder - US Census Bureau. US Census Bureau. Web. 20 Dec. 2014.
 - "SEX BY AGE (HISPANIC OR LATINO) Universe: People Who Are Hispanic or Latino 2008-2012 American Community Survey 5-Year Estimates." American FactFinder - US Census Bureau. US Census Bureau. Web. 20 Dec. 2014.
 - "SEX BY AGE (WHITE ALONE, NOT HISPANIC OR LATINO) Universe: White Alone, Not Hispanic or Latino Population 2008-2012 American Community Survey 5-Year Estimates." American FactFinder - US Census Bureau. US Census Bureau. Web. 20 Dec. 2014.
 - Green, Hank, and John Green. "YOU ARE WRONG!" YouTube. YouTube, 19 Jan. 2011. Web. 21 Dec. 2014.
 - Siebens, Julie, and Camille L. Ryan. "Field of Bachelor's Degree in the United States: 2009." American Community Survey Briefs (2012). Feb. 2012. Web. 20 Dec. 2014.
 - Stolte, Chris, and Pat Hanrahan. "Polaris: A System for Query, Analysis and Visualization of Multi-dimensional Relational Databases." INFOVIS '00 Proceedings of the IEEE Symposium on Information Vizualization 2000 (2000): 5. Stanford Computer Graphics Laboratory. Stanford University. Web. 20 Dec. 2014.
 - "Table 1. Sex, Race, and Hispanic Origin by Field of Degree for the First Listed Bachelor's Degree: 2012." United States Census Bureau. United States Census Bureau, 10 June 2014. Web. 20 Dec. 2014.
 - "Table 3. Percent Unemployed by Field of Degree, Occupation, Sex, Race, and Hispanic Origin: 2012." US Census Bureau. US Census Bureau, 10 July 2014. Web. 20 Dec. 2014.

**What did you learn?**  
This visualization underscores an unavoidable complexity in discussing educational background and post-college outcomes. Even in the broad scope of the US Census, the data, like truth, resist simplicity (Green).

Let's take some examples... While this visualization highlights similarity between genders in overall educational attainment, some degrees like "Engineering" have a great deal more men than women. However, at the same time, some fields like "Psychology" have a disproportionate number of females compared to males. Meanwhile, looking at unemployment, men are jobless at higher rates in "Communications" than their female counterparts but women suffer from higher unemployment than men in "Computers, maths, and stats". Of course, this extends far beyond gender and unemployment. For example, "White" Americans hold the lion's share of bachelor's degrees but, adjusting by the size of the overall national population per ethnic group, it turns out that "Asians" earn degrees at higher rates. Additionally, regardless of gender, "African Americans" have higher unemployment rates than all other ethic groups, even after they achieve the same degree. Yet, still, the numbers become fairly close in some disciplines like "Education". That said, men certainly earn more income than their female counterparts in all fields but, even in that generalization, the disparity varies greatly depending on the discipline at hand. Given this nuance, this project cannot tell its readers what to think but it can invite them to dive deeply into the data, asking them to mouse over the visualization and to configure the radio buttons that choose the metrics displayed.

Note that the [US Census provides a description of each category](http://www.census.gov/prod/2012pubs/acs-18.pdf) (pg 21).

**What should I know about the data?**  
While this project hopes to eventually draw data directly from an API published by the US Census, it currently combines a few different Census reports. First, earnings information comes from a [2012 report](http://www.census.gov/prod/2012pubs/acsbr11-10.pdf) and the [US Census Fact Finder], boath using [2011 American Community Survey information](http://factfinder.census.gov/faces/tableservices/jsf/pages/productview.xhtml?pid=ACS_11_5YR_S2402&prodType=table). However, the number of people with each degree, unemployment, and overall population by age and ethnicity ([US Census Fact Finder](http://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml?refresh=t)) come from the 2012 American Community Survey. The 2011 income data use median income for those over the age of 16 when discussing the general population while median income for those with a bachelor's degree starts at age 25. The 2012 data focus on ages 25-64. So, this report attempts to use the data consistently (not display data from different ACS years at the same time) but there are still multiple datasets represented. For more details, see works cited below.


**I have some thoughts about this visual design. Any papers that you suggest I review?**  
 - [Table Lens](https://www.cs.ubc.ca/~tmm/courses/cpsc533c-04-fall/readings/tablelens.pdf) (1994 public academic paper)
 - [Philbert Maurice d'Ocagne's parallel coordinates](http://en.wikipedia.org/wiki/Parallel_coordinates) (1885)
 - Harness-Minard-Sankey Diagram (1838, 1869, 1898)
 - Stephen Few's "[proportional highlighting](http://www.perceptualedge.com/articles/visual_business_intelligence/coordinated_highlighting_in_context.pdf)" (2010 public paper)
 - To a lesser extent, [Polaris](https://graphics.stanford.edu/papers/polaris/polaris.pdf) (2000 public academic paper)


Anyway, despite some room for improvement, I hope this work takes a logical step in those long lines of thought within visualization science. All that said, these design considerations and the overall visual structure are very unlikely to suit general purpose visualization and the their tools. Some trade-offs were made in regards to the dynamics of this very specific dataset.

**Who are you? Who did this?**  
You can find more info about me and my past work at [my personal website](http://gleap.org). This was a self-direction personal (two) weekend project. So, it is not an official Google product. The views and opinions expressed here are those of the author and do not necessarily reflect the views of Google, its affiliates, or its employees.

**Update on copyright** My (now former) employer (Google) has granted me the copyright to this project.
