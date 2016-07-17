/**
 * Constants for spacing, sizing, ordering, and labeling.
 *
 * Constants for a college majors visualization that define spacing, sizing,
 * ordering, and labeling.
 *
 * Copyright 2016 Sam Pottinger
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author Sam Pottinger
 */

/**
 * Section width in the visualization where each degree has multiple sections
 *
 * @const
 * How wide a section of the visualization (display of a single metric) should
 * span in pixels where the visualization displays multiple sections per degree.
 * This is width of a "column" in pixels.
 */
var SECTION_WIDTH = 180;

/**
 * Width in pixels allocated to a chord / flow diagram.
 *
 * @const
 */
var CHORD_SIZE = 190;

/**
 * Width of the "summarizing" graphic for a chord / flow diagram.
 *
 * @const
 */
var CHORD_GLYPH_SIZE = 70;

/**
 * How tall a row for a discipline should be in pixels.
 *
 * @const
 */
var DISCIPLINE_HEIGHT = 40;

/**
 * By how much to offset the bar chart of a cord "summarizing" graphic.
 *
 * @const
 * By how much to offset the bar from the text label for a chord "summarizing"
 * graphic. This pixel offset should be applied in the y axis.
 */
var CHORD_GLYPH_HEADER_RECT_OFFSET = 10;

/**
 * Space to reserve for scale tick and label at top of visulization.
 *
 * @const
 */
var SCALE_PADDING = 7;

/**
 * How many pixels in the x direction to separate sections in a discipline row.
 *
 * @const
 * By how many pixels to separate sections or "columns" in the table of
 * discipline statistics.
 */
var SECTION_PADDING = 4;

/**
 * Y axis offset for the text headers in the top of the table in pixels.
 *
 * @const
 */
var HEADER_TEXT_OFFSET = 5;

/**
 * By how much to offset the bars used to display statistics by ethnicity.
 *
 * By how much to offset the bars in the x direction that display statistics
 * for disciplines by ethnicity. This offset is applied to bar in the
 * "ethnicity" column.
 *
 * @const
 */
var ETHNICITY_BAR_PADDING = 60;

/**
 * The height of the visualization in pixels.
 *
 * @const
 */ 
var TOTAL_HEIGHT = 680;

/**
 * Number of sections or "columns" in the visualization per discipline.
 *
 * @const
 */
var NUM_SECTIONS = 4;

/**
 * Locations of "sources" for gender groups in the left chord diagram.
 *
 * Location of the gender "source" in the left chord / flow diagram as a percent
 * (>=0 && <=1) from the top to the bottom of the visualization.
 *
 * @const
 */
var GENDER_CHORD_PLACEMENT = d3.map({
    'men': 1/3,
    'women': 2/3
});

/**
 * Locations of "sources" for ethnicity groups in the left chord diagram.
 *
 * Location of the ethnicity "source" in the left chord / flow diagram as a
 * percent (>=0 && <=1) from the top to the bottom of the visualization.
 *
 * @const
 */
var ETHNICITY_PLACEMENT = d3.map({
    'white_not_hispanic': 0.2,
    'asian': 0.4,
    'black_or_african_american': 0.6,
    'hispanic_or_latino': 0.8
});

/**
 * The order in which gender groups should be displayed in the visualization.
 *
 * @const
 */
var GENDER_ORDER = [
    'men',
    'women'
];

/**
 * The order in which discipline groups should be displayed.
 *
 * @const
 */ 
var DISCIPLINE_ORDER = [
    'Computers, maths, and stats',
    'Engineering',
    'Physical and related sci',
    'Bio, agricult, and enviro sci',
    'Psychology',
    'Social sciences',
    'Multidisciplinary studies',
    'Sci / eng related',
    'Business',
    'Education',
    'Literature / languages',
    'Liberal arts / history',
    'Visual / performing arts',
    'Communications',
    'Art / humanities other'
];

/**
 * The order in which ethnic groups should be displayed.
 *
 * @const
 */
var ETHNICITY_ORDER = [
    'white_not_hispanic',
    'asian',
    'black_or_african_american',
    'hispanic_or_latino'
];

/**
 * Mapping from name of ethnicity in the data source to a human-friendly name.
 *
 * @const
 */
var ETHNICITY_LABELS = d3.map({
    'asian': 'Asian',
    'black_or_african_american': 'Black, Af Am.',
    'hispanic_or_latino': 'Hispanic, Latino',
    'white_not_hispanic': 'White'
});

/**
 * Mapping from name of gender in the data source to a human-friendly name.
 *
 * @const
 */
var GENDER_LABELS = d3.map({
    'men': 'Men',
    'women': 'Women'
});

/**
 * Components to use in creating titles for the table.
 *
 * Mapping from calculation method and metric ("which numbers to use") names to
 * components to concatenate together to create a title for the table.
 *
 * @const
 */
var TITLE_COMPONENTS = d3.map({
    'size': 'Employed working age population by bachelor\'s degree held',
    'unemployment': 'Unemployment rate by bachelor\'s degree held',
    'earnings': 'Median income by bachelor\'s degree held',
    'population': '.',
    'percent': ' as % of all degree holders.',
    'percent_by_pop_group': ' as % of overall population.'
});

/**
 * D3 number formatter that puts commas in for thousands.
 *
 * @const
 */
var COMMA_FORMATTER = d3.format(',');

/**
 * D3 number formatter that rounds decimal numbers to the hundredths place.
 *
 * @const
 */
var DECIMAL_FORMATTER = d3.format('.2f');


/**
 * Label set for the table body.
 *
 * Mapping from metric ("which numbers to use"), calculation method, and group
 * (ex: male, asian) to the human readable label. That label should be used as a
 * caption for that group's value as well as the formatter to use in
 * string-ifying the value itself. This label set only includes information for
 * inside the visualization's table (does not include chord diagrams).
 *
 * @const
 */
var MIDDLE_LABELS_SET = d3.map({
  'size': d3.map({
    'population': d3.map({
      'men': 'Men with selected degree',
      'women': 'Women with selected degree',
      'white_not_hispanic': 'White persons with selected degree',
      'asian': 'Asian persons with selected degree',
      'black_or_african_american': 'Black persons with selected degree',
      'hispanic_or_latino': 'Hisp / Lat persons with selected degree',
      'formatter': COMMA_FORMATTER
    }),
    'percent': d3.map({
      'men': '% with selected degree are Men',
      'women': '% with selected degree are Women',
      'white_not_hispanic': '% with selected degree are White',
      'asian': '% with selected degree are Asian',
      'black_or_african_american': '% with selected degree are Black',
      'hispanic_or_latino': '% with selected degree are Hisp / Lat',
      'formatter': DECIMAL_FORMATTER
    }),
    'percent_by_pop_group': d3.map({
      'men': '% of Men have selected degree',
      'women': '% of Women have selected degree',
      'white_not_hispanic': '% of White pop have selected degree',
      'asian': '% of Asian pop have selected degree',
      'black_or_african_american': '% of Black pop have selected degree',
      'hispanic_or_latino': '% of Hisp / Lat pop have selected degree',
      'formatter': DECIMAL_FORMATTER
    })
  }),
  'unemployment': d3.map({
    'population': d3.map({
      'men': '% Men unemployment rate',
      'women': '% Women unemployment rate',
      'white_not_hispanic': '% White unemployment rate',
      'asian': '% Asian unemployment rate',
      'black_or_african_american': '% Black unemployment rate',
      'hispanic_or_latino': '% Hisp / Lat unemployment rate',
      'formatter': DECIMAL_FORMATTER
    }),
    'percent': d3.map({
      'men': 'Men % compared to overall degree unempl.',
      'women': 'Women % compared to overall degree unempl.',
      'white_not_hispanic': 'White % compared to overall degree unempl.',
      'asian': 'Asian % compared to overall degree unempl.',
      'black_or_african_american': 'Black % compared to overall degree unempl.',
      'hispanic_or_latino': 'Hisp / Lat % compared to overall degree unempl.',
      'formatter': DECIMAL_FORMATTER
    })
  }),
  'earnings': d3.map({
    'population': d3.map({
      'men': 'USD for Men with selected degree',
      'women': 'USD for Women with selected degree',
      'white_not_hispanic': '',
      'asian': '',
      'black_or_african_american': '',
      'hispanic_or_latino': '',
      'formatter': COMMA_FORMATTER
    }),
    'percent': d3.map({
      'men': '% compared to overall degree Men',
      'women': '% compared to overall degree Women',
      'white_not_hispanic': '',
      'asian': '',
      'black_or_african_american': '',
      'hispanic_or_latino': '',
      'formatter': DECIMAL_FORMATTER
    }),
    'percent_by_pop_group': d3.map({
      'men': '% compared to overall US Men',
      'women': '% compared to overall US Women',
      'white_not_hispanic': '',
      'asian': '',
      'black_or_african_american': '',
      'hispanic_or_latino': '',
      'formatter': DECIMAL_FORMATTER
    })
  })
});

/**
 * Set of labels to use for the visualization's chord diagrams.
 *
 * Mapping from metric ("which numbers to use"), calculation method, and group
 * (ex: male, asian) to the human readable label. That label should be used as a
 * caption for that group's value as well as the formatter to use in
 * string-ifying the value itself. This only includes labels for use in the left
 * and right cord diagrams.
 */
var CHORD_LABELS_SET = d3.map({
  'size': d3.map({
    'population': d3.map({
      'men': 'Men with bachelor\'s degree',
      'women': 'Women with bachelor\'s degree',
      'white_not_hispanic': 'White persons with bachelor\'s degree',
      'asian': 'Asian persons with bachelor\'s degree',
      'black_or_african_american': 'Black persons with bachelor\'s degree',
      'hispanic_or_latino': 'Hisp / Lat persons with bachelor\'s degree',
      'formatter': COMMA_FORMATTER
    }),
    'percent': d3.map({
      'men': '% with a a bachelor\'s degree are Men',
      'women': '% with a bachelor\'s degree are Women',
      'white_not_hispanic': '% with a bachelor\'s degree are White',
      'asian': '% with a bachelor\'s degree are Asian',
      'black_or_african_american': '% with a bachelor\'s degree are Black',
      'hispanic_or_latino': '% with a bachelor\'s degree are Hisp / Lat',
      'formatter': DECIMAL_FORMATTER
    }),
    'percent_by_pop_group': d3.map({
      'men': '% of Men have a bachelor\'s degree',
      'women': '% of Women have a bachelor\'s degree',
      'white_not_hispanic': '% of White pop have a bachelor\'s degree',
      'asian': '% of Asian pop have a bachelor\'s degree',
      'black_or_african_american': '% of Black pop have a bachelor\'s degree',
      'hispanic_or_latino': '% of Hisp / Lat pop have a bachelor\'s degree',
      'formatter': DECIMAL_FORMATTER
    })
  }),
  'unemployment': d3.map({
    'population': d3.map({
      'men': '% Men unemployment rate',
      'women': '% Women unemployment rate',
      'white_not_hispanic': '% White unemployment rate',
      'asian': '% Asian unemployment rate',
      'black_or_african_american': '% Black unemployment rate',
      'hispanic_or_latino': '% Hisp / Lat unemployment rate',
      'formatter': DECIMAL_FORMATTER
    }),
    'percent': d3.map({
      'men': 'Men % compared to all with bachelor\'s degree',
      'women': 'Women % compared to all with bachelor\'s degree',
      'white_not_hispanic': 'White % compared to all with bachelor\'s degree',
      'asian': 'Asian % compared to all with bachelor\'s degree',
      'black_or_african_american': 'Black % comp. to all with bachelor\'s',
      'hispanic_or_latino': 'Hisp / Lat % compared to all with bachelor\'s',
      'formatter': DECIMAL_FORMATTER
    })
  }),
  'earnings': d3.map({
    'population': d3.map({
      'men': 'USD for Men',
      'women': 'USD for Women',
      'white_not_hispanic': '',
      'asian': '',
      'black_or_african_american': '',
      'hispanic_or_latino': '',
      'formatter': COMMA_FORMATTER
    }),
    'percent': d3.map({
      'men': '% compared to overall US persons with a bachelor\'s',
      'women': '% compared to overall US persons with a bachelor\'s',
      'white_not_hispanic': '',
      'asian': '',
      'black_or_african_american': '',
      'hispanic_or_latino': '',
      'formatter': DECIMAL_FORMATTER
    }),
    'percent_by_pop_group': d3.map({
      'men': '% compared to overall US Men',
      'women': '% compared to overall US Women',
      'white_not_hispanic': '',
      'asian': '',
      'black_or_african_american': '',
      'hispanic_or_latino': '',
      'formatter': DECIMAL_FORMATTER
    })
  })
});

/**
 * Scroll region for top of visualization
 * @const
 */
var SCROLL_TOP = 100;

/**
 * Scroll region for bottom of visualization
 * @const
 */
var SCROLL_BOTTOM = 980;
