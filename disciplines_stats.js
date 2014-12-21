/**
 * Visualization of bachelor's degrees.
 *
 * Visualization of what people are studying while at university for their
 * bachelor's degree as well as how those people fare after finishing. The
 * visualization examines these trends by gender and ethnicity.
 *
 * Copyright 2014 Google Inc.
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
 * Get the default discipline order if not provided.
 *
 * @param {Array<string>=} opt_disciplineOrder The order that the disciplines
 *     appear in the visualization. Defaults to DISCIPLINE_ORDER.
 * @return {Array<string>} opt_disciplineOrder or DISCIPLINE_ORDER if the
 *     parameter is not provided.
 */
function getDisciplineOrder(opt_disciplineOrder) {
  if (opt_disciplineOrder === undefined) {
    return DISCIPLINE_ORDER;
  } else {
    return opt_disciplineOrder;
  }
}


/**
 * Get the maximum value for a field or metric by gender.
 *
 * Get the maximum value reported between the male and female values for a
 * given field or metric like unemployment.
 *
 * @param {string} field The name of the field (like "unemployment") to find the
 *     maximum value for.
 * @param {d3.map} data The data in which to find the maximum value.
 * @param {Array<string>=} opt_disciplineOrder The order that the disciplines
 *     appear in the visualization. Defaults to DISCIPLINE_ORDER.
 * @return {number} The maximum value found for the given field between men and
 *     women.
 */
function genderMax(field, data, opt_disciplineOrder) {
  var disciplineOrder = getDisciplineOrder(opt_disciplineOrder);

  var maxEnumeration = disciplineOrder.map(function(discipline) {
    var nestedMax = d3.max(['men', 'women'], function(subgroup) {
      return data.get(discipline)[field]['by_gender'][subgroup];
    });
    return nestedMax;
  });

  return d3.max(maxEnumeration);
}


/**
 * Get the maximum value for field or metric by ethnicity.
 *
 * Get the maximum value reported by all ethnic groups for a given field or
 * metric like unemployment.
 *
 * @param {string} field The name of the field (like "unemployment") to find the
 *     maximum value for.
 * @param {d3.map} data The data in which to find the maximum value.
 * @param {Array<string>=} opt_disciplineOrder The order that the disciplines
 *     appear in the visualization. Defaults to DISCIPLINE_ORDER.
 * @return {number} The maximum value found for the given field.
 */
function ethnicityMax(field, data, opt_disciplineOrder) {
  var disciplineOrder = getDisciplineOrder(opt_disciplineOrder);

  var maxEnumeration = disciplineOrder.map(function(discipline) {
    var nestedMax = d3.max(ETHNICITY_ORDER, function(subgroup) {
      return data.get(discipline)[field]['by_ethnicity'][subgroup]
    });

    return nestedMax;
  });

  return d3.max(maxEnumeration);
}


/**
 * Create bars at the bottom of a discipline row.
 *
 * @param {d3.selection} groups The selection to which the separator
 *     (horizontal rule) should be applied.
 * @param {number} sectionNum The length of horizontal rule to created as
 *     measured by number of sections (SECTION_WIDTHs).
 */
function createBottomBars(groups, sectionNum) {
  groups.append('rect')
    .classed('bottom-bar', true)
    .attr('x', SECTION_WIDTH * sectionNum)
    .attr('y', DISCIPLINE_HEIGHT - SECTION_PADDING)
    .attr('width', SECTION_WIDTH - SECTION_PADDING)
    .attr('height', 1);
}


/**
 * Create the elements of the visualization inner bars display.
 *
 * Create the elements of the inner bars display (excludes chord diagrams)
 * within the visualization based on the selected data.
 *
 * @param {d3.map} data The data to bind to the newly created inner bar
 *     elements.
 */
function createGroups(data) {
  var target = d3.select('#disciplines-vis-target');

  var entries = data.entries();
  entries = entries.filter(function(entry) {
    return DISCIPLINE_ORDER.indexOf(entry.key) !== -1;
  })
  entries.sort(function(a, b) {
    return DISCIPLINE_ORDER.indexOf(a.key) - DISCIPLINE_ORDER.indexOf(b.key);
  });
  
  var groups = target.selectAll('.discipline-group').data(entries);

  groups.enter().append('g').classed('discipline-group', true);

  var reflectData = function(data) { return [data]; };
  
  var createGroupElement = function(className, type) {
    var selection = groups.selectAll('.' + className).data(reflectData);
    selection.enter().append(type).classed(className, true);
    selection.attr('opacity', 1);
  };

  createGroupElement('men-display', 'rect');
  createGroupElement('women-display', 'rect');
  createGroupElement('asian-bar', 'rect');
  createGroupElement('black-bar', 'rect');
  createGroupElement('hispanic-bar', 'rect');
  createGroupElement('white-bar', 'rect');
  createGroupElement('degree-hover-region', 'rect');

  createGroupElement('overview-text', 'text');
  createGroupElement('total-text', 'text');
  createGroupElement('asian-label', 'text');
  createGroupElement('black-label', 'text');
  createGroupElement('hispanic-label', 'text');
  createGroupElement('white-label', 'text');

  groups.attr('transform', function(discipline, i) {
        var y = (i + 1) * DISCIPLINE_HEIGHT;
        return 'translate(' + CHORD_SIZE + ', ' + y + ')';
      });

  groups.selectAll('.degree-hover-region')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', SECTION_WIDTH * 4)
      .attr('height', DISCIPLINE_HEIGHT - SECTION_PADDING);
}


/**
 * Create the headers for the inner bar display.
 */
function createHeaders() {
  var headerGroup = d3.select('#disciplines-vis-target').append('g');

  headerGroup.classed('header', true);

  /**
   * Create a left aligned header.
   *
   * @param {string} text The text to display within the header.
   * @param {number} sectionNum The 0th index of this header or, alternatively,
   *     the number of headers that preceded this header.
   * @param {number} Manual offset in pixels to move the header.
   */
  var createInnerHeader = function(text, sectionNum, opt_offset) {
    if (opt_offset == undefined)
      opt_offset = 0;

    headerGroup.append('text')
        .attr('x', CHORD_SIZE + SECTION_WIDTH * sectionNum + opt_offset)
        .attr('y', DISCIPLINE_HEIGHT / 2 + HEADER_TEXT_OFFSET)
        .text(text); 

    headerGroup.append('rect')
        .attr('x', CHORD_SIZE + SECTION_WIDTH * sectionNum)
        .attr('y', DISCIPLINE_HEIGHT / 2 + CHORD_GLYPH_HEADER_RECT_OFFSET)
        .attr('width', SECTION_WIDTH - SECTION_PADDING)
        .attr('height', 1);
  };

  /**
   * Create a right aligned header.
   *
   * @param {string} text The text to display within the header.
   * @param {number} The 0th index of this header or, alternatively,
   *     the number of headers that preceded this header.
   * @param {number} Manual offset in pixels to move the header.
   */
  var createInnerHeaderRight = function(text, sectionNum, opt_offset) {
    if (opt_offset == undefined)
      opt_offset = 0;

    var nextSect = sectionNum + 1;
    headerGroup.append('text')
      .text(text)
      .attr('y', DISCIPLINE_HEIGHT / 2 + HEADER_TEXT_OFFSET)
      .attr('text-anchor', 'end')
      .attr('x',
          CHORD_SIZE + SECTION_WIDTH * nextSect - SECTION_PADDING + opt_offset
      );

    headerGroup.append('rect')
        .attr('x', CHORD_SIZE + SECTION_WIDTH * sectionNum)
        .attr('y', DISCIPLINE_HEIGHT / 2 + CHORD_GLYPH_HEADER_RECT_OFFSET)
        .attr('width', SECTION_WIDTH - SECTION_PADDING)
        .attr('height', 1);
  };

  headerGroup.append('text')
    .attr('x', 0)
    .attr('y', DISCIPLINE_HEIGHT / 2 + HEADER_TEXT_OFFSET)
    .text('Gender'); 

  headerGroup.append('rect')
    .attr('x', 0)
    .attr('y', DISCIPLINE_HEIGHT / 2 + CHORD_GLYPH_HEADER_RECT_OFFSET)
    .attr('width', CHORD_SIZE - SECTION_PADDING)
    .attr('height', 1);

  headerGroup.append('text')
    .attr('x', CHORD_SIZE + SECTION_WIDTH * 4)
    .attr('y', DISCIPLINE_HEIGHT / 2 + HEADER_TEXT_OFFSET)
    .text('Ethnicity'); 

  headerGroup.append('rect')
    .attr('x', CHORD_SIZE + SECTION_WIDTH * 4)
    .attr('y', DISCIPLINE_HEIGHT / 2 + CHORD_GLYPH_HEADER_RECT_OFFSET)
    .attr('width', CHORD_SIZE - SECTION_PADDING)
    .attr('height', 1);

  createInnerHeader('Degree', 0);
  createInnerHeaderRight('Men with Degree', 1, -10);
  createInnerHeader('Women with Degree', 2, 10);
  createInnerHeader('Degree by Ethnicity', 3);
}


/**
 * Create text for the degree / field on the left of the inner viz area.
 *
 * @param {boolean} shouldCreateBottomBar Flag indicating if the separation bar
 *     (horizontal rule) should be displayed at the bottom of the label.
 */
function createLeftHeader(shouldCreateBottomBar) {
  var groups = d3.selectAll('.discipline-group');

  groups.selectAll('.overview-text')
      .attr('x', 0)
      .attr('y', DISCIPLINE_HEIGHT / 2 - 5)
      .text(function(discipline) {
        return discipline.key;
      });

  if (shouldCreateBottomBar) {
    createBottomBars(groups, 0);
  }
}


/**
 * Create the labels and bars for men in the inner visualization.
 *
 * @param {d3.map} data The data to pull male enrollment and outcomes data from.
 * @param {string} metric The name of the metric currently being displayed
 *     within the table (like income, unemployment, etc).
 * @param {boolean} shouldCreateBottomBar Flag indicating if the separation bar
 *     (horizontal rule) should be displayed at the bottom of the bar.
 * @param {Array<string>=} opt_disciplineOrder The order that the disciplines
 *     appear in the visualization. Defaults to DISCIPLINE_ORDER.
 */
function createMenDisplay(data, metric, shouldCreateBottomBar,
    opt_disciplineOrder) {

  var fieldMax = genderMax(metric, data, opt_disciplineOrder);

  var groups = d3.selectAll('.discipline-group');

  var scale = d3.scale.linear()
      .domain([0, fieldMax])
      .range([0, SECTION_WIDTH - SECTION_PADDING]);

  var bars = groups.selectAll('.men-display');

  bars.classed('metric-bar', true).transition()
      .attr('x', function(discipline) {
        var targetVal = discipline.value[metric]['by_gender']['men'];
        var xCoord = scale(targetVal);
        return SECTION_WIDTH * 2 - SECTION_PADDING - xCoord;
      })
      .attr('y', DISCIPLINE_HEIGHT / 2 - 5)
      .attr('height', 5)
      .attr('width', function(discipline) {
        var targetVal = discipline.value[metric]['by_gender']['men'];
        return scale(targetVal);
      });

  if(shouldCreateBottomBar) {
    createBottomBars(groups, 1);
  }
}


/**
 * Create the labels and bars for women in the inner visualization.
 *
 * @param {d3.map} data The data to pull male enrollment and outcomes data from.
 * @param {string} metric The name of the metric currently being displayed
 *     within the table (like income, unemployment, etc).
 * @param {boolean} shouldCreateBottomBar Flag indicating if the separation bar
 *     (horizontal rule) should be displayed at the bottom of the bar.
 * @param {Array<string>=} opt_disciplineOrder The order that the disciplines
 *     appear in the visualization. Defaults to DISCIPLINE_ORDER.
 */
function createWomenDisplay(data, metric, shouldCreateBottomBar,
    opt_disciplineOrder) {

  var groups = d3.selectAll('.discipline-group');

  var fieldMax = genderMax(metric, data, opt_disciplineOrder);

  var scale = d3.scale.linear()
      .domain([0, fieldMax])
      .range([0, SECTION_WIDTH - SECTION_PADDING]);

  var bars = groups.selectAll('.women-display');

  bars.classed('metric-bar', true).transition()
      .attr('x', SECTION_WIDTH * 2)
      .attr('y', DISCIPLINE_HEIGHT / 2 - 5)
      .attr('height', 5)
      .attr('width', function(discipline) {
        var targetVal = discipline.value[metric]['by_gender']['women'];
        return scale(targetVal);
      });

  if(shouldCreateBottomBar) {
    createBottomBars(groups, 2);
  }
}


/**
 * Create the inner table lens bar chart for degree by ethnicity.
 *
 * Create the inner bar chart that shows the table's current metric by degree
 * for each ethnicity.
 *
 * @param {d3.map} data The data to pull male enrollment and outcomes data from.
 * @param {string} metric The name of the metric currently being displayed
 *     within the table (like income, unemployment, etc).
 * @param {boolean} shouldCreateBottomBar Flag indicating if the separation bar
 *     (horizontal rule) should be displayed at the bottom of the display.
 * @param {Array<string>=} opt_disciplineOrder The order that the disciplines
 *     appear in the visualization. Defaults to DISCIPLINE_ORDER.
 */
function createEthnicityDisplay(data, metric, shouldCreateBottomBar,
    opt_disciplineOrder) {

  var groups = d3.selectAll('.discipline-group');

  var fieldMax = ethnicityMax(metric, data, opt_disciplineOrder);

  var scale = d3.scale.linear()
      .domain([0, fieldMax])
      .range([0, SECTION_WIDTH - SECTION_PADDING - ETHNICITY_BAR_PADDING]);

  groups.selectAll('.white-bar').classed('metric-bar', true).transition()
      .attr('x', SECTION_WIDTH * 3 + ETHNICITY_BAR_PADDING)
      .attr('y', 3)
      .attr('height', 5)
      .attr('width', function(discipline) {
        var targetVal = discipline.value[metric]['by_ethnicity'];
        targetVal = targetVal['white_not_hispanic'];
        return scale(targetVal);
      });

  groups.selectAll('.asian-bar').classed('metric-bar', true).transition()
      .attr('x', SECTION_WIDTH * 3 + ETHNICITY_BAR_PADDING)
      .attr('y', 11)
      .attr('height', 5)
      .attr('width', function(discipline) {
        var targetVal = discipline.value[metric]['by_ethnicity']['asian'];
        return scale(targetVal);
      });

  groups.selectAll('.black-bar').classed('metric-bar', true).transition()
      .attr('x', SECTION_WIDTH * 3 + ETHNICITY_BAR_PADDING)
      .attr('y', 19)
      .attr('height', 5)
      .attr('width', function(discipline) {
        var targetVal = discipline.value[metric]['by_ethnicity'];
        targetVal = targetVal['black_or_african_american'];
        return scale(targetVal);
      });

  groups.selectAll('.hispanic-bar').classed('metric-bar', true).transition()
      .attr('x', SECTION_WIDTH * 3 + ETHNICITY_BAR_PADDING)
      .attr('y', 27)
      .attr('height', 5)
      .attr('width', function(discipline) {
        var targetVal = discipline.value[metric]['by_ethnicity'];
        targetVal = targetVal['hispanic_or_latino'];
        return scale(targetVal);
      });

  groups.selectAll('.white-label').classed('ethnicity-text', true)
      .attr('x', SECTION_WIDTH * 3 + ETHNICITY_BAR_PADDING - 2)
      .attr('y', 6)
      .text(function(discipline) {
        return ETHNICITY_LABELS.get('white_not_hispanic');
      });

  groups.selectAll('.asian-label').classed('ethnicity-text', true)
      .attr('x', SECTION_WIDTH * 3 + ETHNICITY_BAR_PADDING - 2)
      .attr('y', 14)
      .text(function(discipline) {
        return ETHNICITY_LABELS.get('asian');
      });

  groups.selectAll('.black-label').classed('ethnicity-text', true)
      .attr('x', SECTION_WIDTH * 3 + ETHNICITY_BAR_PADDING - 2)
      .attr('y', 22)
      .text(function(discipline) {
        return ETHNICITY_LABELS.get('black_or_african_american');
      });

  groups.selectAll('.hispanic-label').classed('ethnicity-text', true)
      .attr('x', SECTION_WIDTH * 3 + ETHNICITY_BAR_PADDING - 2)
      .attr('y', 30)
      .text(function(discipline) {
        return ETHNICITY_LABELS.get('hispanic_or_latino');
      });

  if (shouldCreateBottomBar) {
    createBottomBars(groups, 3);
  }
}


/**
 * Create a sankey chord showing an n to n bivariate graph.
 *
 * Create a sankey chord that shows where genders are going (which degrees and
 * outcomes they are achieving) and where ethnicities are going (which degrees
 * and outcomes they are achieving).
 *
 * @param {d3.map} data The data to create the chords from.
 * @param {string} metric The name of the metric being displayed within the
 *     table (like income, unemployment, etc).
 * @param {Array<string>} leftJoinKeys The name of the keys to use on the left
 *     side of the graph.
 * @param {Array<string>} rightJoinKeys The name of the keys to use on the right
 *     side of the graph.
 * @param {string} dataSlice Which method behind the grouping of data points the
 *     chord diagram is showing (by gender or ethnicity).
 * @param {d3.map} Mapping from the name of the "join key" (male, female, asian,
 *     etc) to the percent offset from the top of the display for that category.
 *     For example, if "asian" has an offset of 0.6, it will be placed 0.6 * 
 *     visualization height from the top of the visualization. The bar chart and
 *     label for that category will be placed at that location and the chord
 *     for that category will connect to that location.
 * @param {string} direction The "direction" of the chord represented as a
 *     string "right" or "left". 
 */
function createFlow(data, metric, leftJoinKeys, rightJoinKeys, dataSlice,
    joinKeyPlacements, direction, target, labels) {

  // Create bars for the "totals" (metric value for gender or ethnicity across
  // all degree types).
  var byTotals = data.get('Total')[metric][dataSlice];

  var totalVals = leftJoinKeys.map(function(joinKey) {
    return byTotals[joinKey];
  });
  var totalsObjs = totalVals.map(function(totalVal, i) {
    return {value: totalVal, key: leftJoinKeys[i]};
  });

  var totalsScale = d3.scale.linear()
      .domain([0, d3.max(totalVals)])
      .range([0, CHORD_GLYPH_SIZE]);

  var targetSelect = d3.select(target);

  var flowSourceSelect = targetSelect.selectAll('.flow-sources')
      .data(totalsObjs);

  flowSourceSelect.enter().append('g')
      .classed('flow-sources', true);

  var rectSelect = flowSourceSelect.selectAll('.flow-sources-rect')
      .data(function(datum) { return [datum]; });
  
  rectSelect.enter().append('rect');

  // Create bar chart for gender / ethnicity
  rectSelect.classed('flow-sources-rect', true).transition()
      .attr('x', function(obj) {
        if(direction === 'left') {
          return CHORD_GLYPH_SIZE - totalsScale(obj.value);
        } else {
          return CHORD_SIZE - CHORD_GLYPH_SIZE;
        }
      })
      .attr('y', function(obj) {
        return joinKeyPlacements.get(obj.key) * TOTAL_HEIGHT - 5;
      })
      .attr('width', function(obj) {
        return totalsScale(obj.value);
      })
      .attr('height', 10);

  var textSelect = flowSourceSelect.selectAll('.flow-label')
      .data(function(datum) { return [datum]; });

  textSelect.enter().append('text');

  // Create label for gender or ethnicity
  textSelect.attr('x', function(obj) {
        if(direction === 'left') {
          return CHORD_GLYPH_SIZE;
        } else {
          return CHORD_SIZE - CHORD_GLYPH_SIZE;
        }
      })
      .attr('y', function(obj) {
        return joinKeyPlacements.get(obj.key) * TOTAL_HEIGHT - 10;
      })
      .attr('text-anchor', function(obj) {
        if(direction === 'left') {
          return 'end';
        } else {
          return 'start';
        }
      })
      .text(function(obj) {
        return labels.get(obj.key);
      })
      .classed('flow-label', true);

  var chordSelection = flowSourceSelect.selectAll('.flow-source-chord');

  // Find data and create scales for the sankey chords
  var groupData = leftJoinKeys.map(function(joinKey) {
    return rightJoinKeys.map(function(discipline, i) {
      var joinTargets = data.get(discipline)[metric][dataSlice];
      
      return {
          discipline: discipline,
          joinKey: joinKey,
          value: joinTargets[joinKey],
          i: i
      };
    });
  });

  var maxDisiplineByJoinValue = d3.max(groupData, function(joinInfo) {
    return d3.max(joinInfo, function(disciplineJoin) {
      return disciplineJoin.value
    });
  });

  var flowScale = d3.scale.linear()
      .domain([0, maxDisiplineByJoinValue])
      .range([0, 10]);

  var chords = chordSelection.data(function(joinInfo, i) {
    return groupData[i];
  });

  // Create sankey chords
  chords.enter().append('path');

  var lineGen = d3.svg.line()
      .x(function(point) { return point.x; })
      .y(function(point) { return point.y; })
      .interpolate('basis');

  chords.classed('flow-source-chord', true).transition()
      .attr('d', function(joinInfo) {
        var startY;
        var endY;
        var width;
        var startX;
        var endX;
        var controlX1;
        var controlX2;

        if (direction === 'left') {
          startX = CHORD_GLYPH_SIZE + 1;
          endX = CHORD_SIZE - 4;
        } else {
          startX = CHORD_SIZE - CHORD_GLYPH_SIZE - 1;
          endX = 4;
        }

        width = endX - startX;
        startY = TOTAL_HEIGHT * joinKeyPlacements.get(joinInfo.joinKey);
        endY = (joinInfo.i + 1) * DISCIPLINE_HEIGHT + DISCIPLINE_HEIGHT / 3;
        controlX1 = startX + width * 0.2;
        controlX2 = startX + width * 0.8;

        return lineGen([
            {x: startX, y: startY},
            {x: controlX1, y: startY},
            {x: controlX2, y: endY},
            {x: endX, y: endY}
        ]);
      })
      .attr('stroke-width', function(joinInfo) {
        return flowScale(joinInfo.value);
      });

  // Create invisible rectangle that acts as a hover region for the flow
  // source.
  var regionSelect = flowSourceSelect.selectAll('.flow-sources-hover-region')
      .data(function(datum) { return [datum]; });
  
  regionSelect.enter().append('rect');

  regionSelect.classed('flow-sources-hover-region', true)
      .attr('x', 0)
      .attr('y', function(obj) {
        return joinKeyPlacements.get(obj.key) * TOTAL_HEIGHT - 35;
      })
      .attr('width', CHORD_SIZE)
      .attr('height', 50);
}


/**
 * Create groups for left and right sankey chords / bars.
 */
function createFlowGroups() {
  var target = d3.select('#disciplines-vis-target');

  target.append('g')
      .classed('left-flow-group', true)
      .attr('opacity', 1);

  target.append('g')
      .classed('right-flow-group', true)
      .attr(
          'transform',
          'translate(' + (CHORD_SIZE + SECTION_WIDTH * NUM_SECTIONS) + ', 0)'
      )
      .attr('opacity', 1);
}


/**
 * Create sankey chord diagram for gender to degree.
 *
 * @param {d3.map} data The data to create the chords from.
 * @param {string} metric The name of the metric being displayed within the
 *     table (like income, unemployment, etc).
 */
function createGenderFlow(data, metric) {
  createFlow(
      data,
      metric,
      GENDER_ORDER,
      DISCIPLINE_ORDER,
      'by_gender',
      GENDER_CHORD_PLACEMENT,
      'left',
      '.left-flow-group',
      GENDER_LABELS
  );
}


/**
 * Create sankey chord diagram for ethnicity to degree.
 *
 * @param {d3.map} data The data to create the chords from.
 * @param {string} metric The name of the metric being displayed within the
 *     table (like income, unemployment, etc).
 */
function createEthnicityFlow(data, metric) {
  createFlow(
      data,
      metric,
      ETHNICITY_ORDER,
      DISCIPLINE_ORDER,
      'by_ethnicity',
      ETHNICITY_PLACEMENT,
      'right',
      '.right-flow-group',
      ETHNICITY_LABELS
  );
}


/**
 * Hide the ethnicity bar chart.
 *
 * Hide the elements for the ethnicity bar chart. Used when displaying a metric
 * for which ethnicity data is unavailable.
 */
function hideEthnicityDisplay() {
  var groups = d3.selectAll('.discipline-group');
  groups.selectAll('.white-bar').transition().attr('opacity', 0);
  groups.selectAll('.asian-bar').transition().attr('opacity', 0);
  groups.selectAll('.black-bar').transition().attr('opacity', 0);
  groups.selectAll('.hispanic-bar').transition().attr('opacity', 0);
  groups.selectAll('.white-label').transition().attr('opacity', 0);
  groups.selectAll('.asian-label').transition().attr('opacity', 0);
  groups.selectAll('.black-label').transition().attr('opacity', 0);
  groups.selectAll('.hispanic-label').transition().attr('opacity', 0);

  d3.selectAll('.right-flow-group').transition().attr('opacity', 0);
}


/**
 * Show the ethnicity bar chart.
 *
 * Show the elements for the ethnicity bar chart. Used when displaying a metric
 * for which ethnicity data is available.
 */
function showEthnicityDisplay() {
  var groups = d3.selectAll('.discipline-group');
  groups.selectAll('.white-bar').attr('opacity', 1);
  groups.selectAll('.asian-bar').attr('opacity', 1);
  groups.selectAll('.black-bar').attr('opacity', 1);
  groups.selectAll('.hispanic-bar').attr('opacity', 1);
  groups.selectAll('.white-label').attr('opacity', 1);
  groups.selectAll('.asian-label').attr('opacity', 1);
  groups.selectAll('.black-label').attr('opacity', 1);
  groups.selectAll('.hispanic-label').attr('opacity', 1);

  d3.selectAll('.right-flow-group').attr('opacity', 1);
}


/**
 * Update the title for the overall visualization.
 *
 * Update the title displayed at the top of the visualization to reflect the
 * metric and calculation method selected by the user.
 *
 * @param {string} selectedMetric The name of the metric that the visualization
 *     is currently displaying (unemployment, income, etc.).
 * @param {string} selectedCal The name of the method used to calculate the
 *     numbers being displayed in the visualization. Can be raw numbers
 *     ("population"), numbers relative to the population by degree ("percent"),
 *     or relative to the population by gender / ethnicity
 *     ("percent_by_pop_group").
 */
function updateTitle(selectedMetric, selectedCalc) {
  var metricText = TITLE_COMPONENTS.get(selectedMetric);
  var calcText = TITLE_COMPONENTS.get(selectedCalc);

  $('#title').hide();
  $('#title').html(metricText + calcText);
  $('#title').fadeIn();
}


/**
 * Attach hover listeners for the middle part of the visualization.
 *
 * @param {{metric: string, calc: string}} selectionInfo Information about the
 *     set of user configuration options currently selected.
 */
function attachMiddleListeners(selectionInfo) {
  var disciplineGroupSelection = d3.selectAll('.discipline-group');

  var resetStyling = function() {
    disciplineGroupSelection.selectAll('.overview-text')
        .attr('fill', '#838383');

    disciplineGroupSelection.selectAll('.metric-bar')
        .attr('fill', '#838383');

    disciplineGroupSelection.selectAll('.ethnicity-text')
        .attr('fill', '#B1B1B1');

    d3.selectAll('.flow-source-chord')
        .attr('opacity', 0.3);

    d3.selectAll('.flow-source-chord')
        .attr('stroke', '#C1C1C1');
  };

  resetStyling();

  d3.selectAll('.discipline-group').on('mouseenter', function(datum) {
    var groupSelection = d3.select(this);
    groupSelection.selectAll('.overview-text').attr('fill', 'black');
    groupSelection.selectAll('.metric-bar').attr('fill', 'black');
    groupSelection.selectAll('.ethnicity-text').attr('fill', 'black');

    $('#instructions-details-panel').hide();
    $('#side-section-details-panel').hide();
    $('#middle-section-details-panel').show();
    
    var labelsSet = MIDDLE_LABELS_SET.get(selectionInfo.metric)
        .get(selectionInfo.calc);

    $('#men-display-caption').html(labelsSet.get('men'));
    $('#women-display-caption').html(labelsSet.get('women'));
    $('#white-display-caption').html(labelsSet.get('white_not_hispanic'));
    $('#asian-display-caption').html(labelsSet.get('asian'));
    $('#hisp-display-caption').html(labelsSet.get('hispanic_or_latino'));
    $('#black-display-caption').html(
        labelsSet.get('black_or_african_american')
    );

    var datumValues = datum.value[selectionInfo.metric];
    var formatter = labelsSet.get('formatter');
    $('#men-display-label').html(
        formatter(datumValues['by_gender']['men'])
    );
    $('#women-display-label').html(
        formatter(datumValues['by_gender']['women'])
    );

    if (datumValues['by_ethnicity'] !== undefined) {
      $('#white-display-label').html(
          formatter(datumValues['by_ethnicity']['white_not_hispanic'])
      );
      $('#asian-display-label').html(
          formatter(datumValues['by_ethnicity']['asian'])
      );
      $('#black-display-label').html(
          formatter(datumValues['by_ethnicity']['black_or_african_american'])
      );
      $('#hisp-display-label').html(
          formatter(datumValues['by_ethnicity']['hispanic_or_latino'])
      );
    } else {
      $('#white-display-label').html('');
      $('#asian-display-label').html('');
      $('#black-display-label').html('');
      $('#hisp-display-label').html('');
    }

    d3.selectAll('.flow-source-chord')
        .filter(function(joinInfo) {
          return joinInfo.discipline === datum.key;
        })
        .attr('opacity', 1)
        .attr('stroke', 'black');
  });

  d3.selectAll('.discipline-group').on('mouseleave', function() {
    $('#middle-section-details-panel').hide();
    $('#instructions-details-panel').show();
    resetStyling();
  });
}


/**
 * Attach click listeners for the left and right sankey chord diagrams.
 *
 * @param {{metric: string, calc: string}} selectionInfo Information about the
 *     user configuration options currently selected.
 */
function attachFlowListeners(selectionInfo) {
  
  var resetStyling = function() {
    d3.selectAll('.flow-sources-rect').attr('fill', '#838383');
    d3.selectAll('.flow-label').attr('fill', '#838383');
    d3.selectAll('.flow-source-chord').attr('opacity', 0.3);
    d3.selectAll('.flow-source-chord').attr('stroke', '#C1C1C1');
  };

  resetStyling();

  d3.selectAll('.flow-sources-hover-region').on('mouseenter', function(datum) {
    $('#instructions-details-panel').hide();
    $('#side-section-details-panel').show();
    $('#middle-section-details-panel').hide();

    var labelsSet = CHORD_LABELS_SET.get(selectionInfo.metric)
        .get(selectionInfo.calc);

    $('#side-display-caption').html(labelsSet.get(datum.key));

    var datumValues = datum.value[selectionInfo.metric];
    var formatter = labelsSet.get('formatter');
    $('#side-display-label').html(formatter(datum['value']));

    d3.selectAll('.flow-sources-rect')
        .filter(function(innerDatum) {
          return datum.key === innerDatum.key;
        })
        .attr('fill', 'black');

    d3.selectAll('.flow-label')
        .filter(function(innerDatum) {
          return datum.key === innerDatum.key;
        })
        .attr('fill', 'black');

    d3.selectAll('.flow-source-chord')
        .filter(function(joinInfo) {
          return joinInfo.joinKey === datum.key;
        })
        .attr('opacity', 1)
        .attr('stroke', 'black');
  });

  d3.selectAll('.flow-sources-hover-region').on('mouseleave', function() {
    resetStyling();
    $('#instructions-details-panel').show();
    $('#side-section-details-panel').hide();
  });
}


/**
 * Callback for after the JSON source data has been loaded by the browser.
 *
 * @param {string} Description of an error encountered in loading the JSON data
 *     or null if no error encountered.
 * @param {Object} rawData The raw data (parsed version of JSON) returned by
 *     the server.
 */
function onLoad(error, rawData) {
  var popData = d3.map(rawData['population']);
  var selectionInfo = {
    metric: 'size',
    calc: 'population'
  };

  createGroups(popData);
  createFlowGroups();
  createHeaders();

  createMenDisplay(popData, 'size', true);
  createWomenDisplay(popData, 'size', true);
  createLeftHeader(true);
  createEthnicityDisplay(popData, 'size', true);

  createGenderFlow(popData, 'size');
  createEthnicityFlow(popData, 'size');

  attachMiddleListeners(selectionInfo);
  attachFlowListeners(selectionInfo);

  updateTitle('size', 'population');

  /**
   * Update the display after the user changes their configuration options.
   *
   * @param {string} selectedMetric The name of the metric selected by the user.
   *     Examples include size, unemployment, earnings.
   * @param {string} selectedCalc The name of the calculation method selected by
   *     the user. Can be raw numbers ("population"), numbers relative to the
   *     population by degree ("percent"), or relative to the population by
   *     gender / ethnicity ("percent_by_pop_group").
   */
  var updateDisplay = function(selectedMetric, selectedCalc) {
    var selectedMetric = $('.which-check:checked').val();
    var selectedCalc = $('.how-check:checked').val();

    selectionInfo.metric = selectedMetric;
    selectionInfo.calc = selectedCalc;

    updateTitle(selectedMetric, selectedCalc);

    var targetData = d3.map(rawData[selectedCalc]);

    createGroups(targetData);

    createMenDisplay(targetData, selectedMetric, false);
    createWomenDisplay(targetData, selectedMetric, false);
    createLeftHeader(false);
    
    if (selectedMetric === 'earnings') {
      hideEthnicityDisplay();
    } else {
      showEthnicityDisplay();
      createEthnicityDisplay(targetData, selectedMetric, false);
    }

    createGenderFlow(targetData, selectedMetric);
    createEthnicityFlow(targetData, selectedMetric);
  }

  /**
   * Update display and change availability of controls based on metric.
   *
   * Update the visualization display in response to the user changing the
   * desired metric to display in the graphic. This also disables / enables
   * radio buttons and warning messages based on which metric was selected
   * (there are gaps in data).
   * 
   * @param {string} selectedMetric The name of the metric selected by the user.
   *     Examples include size, unemployment, earnings.
   * @param {string} selectedCalc The name of the calculation method selected by
   *     the user. Can be raw numbers ("population"), numbers relative to the
   *     population by degree ("percent"), or relative to the population by
   *     gender / ethnicity ("percent_by_pop_group").
   */
  var updateDisplayCheckMetric = function(selectedMetric, selectedCalc) {
    var selectedMetric = $('.which-check:checked').val();

    if (selectedMetric === 'earnings') {
      $('#income-note').css('color', 'black');
    } else {
      $('#income-note').css('color', '#838383');
    }

    if (selectedMetric === 'unemployment') {
      $('.how-check[value="percent_by_pop_group"]').attr('disabled', true);
    } else {
      $('.how-check[value="percent_by_pop_group"]').attr('disabled', false);
    }

    updateDisplay();
  }

  /**
   * Update display and change availability of controls based on calculation.
   *
   * Update the visualization display in response to the user changing the
   * desired calculation metric to use in the graphic. This also disables /
   * enables radio buttons and warning messages based on which method was
   * selected (there are gaps in data).
   * 
   * @param {string} selectedMetric The name of the metric selected by the user.
   *     Examples include size, unemployment, earnings.
   * @param {string} selectedCalc The name of the calculation method selected by
   *     the user. Can be raw numbers ("population"), numbers relative to the
   *     population by degree ("percent"), or relative to the population by
   *     gender / ethnicity ("percent_by_pop_group").
   */
  var updateDisplayCheckCalc = function() {
    var selectedCalc = $('.how-check:checked').val();

    if (selectedCalc === 'percent_by_pop_group') {
      $('#by-group-note').css('color', 'black');
      $('.which-check[value="unemployment"]').attr('disabled', true);
    } else {
      $('#by-group-note').css('color', '#838383');
      $('.which-check[value="unemployment"]').attr('disabled', false);
    }

    updateDisplay();
  }

  $('#by-group-instructions').hide();
  $('.which-check').click(updateDisplayCheckMetric);
  $('.how-check').click(updateDisplayCheckCalc);
}


/**
 * Function to call when the window is scrolled.
 *
 * Function for small monitors that will fix the title to the top of the
 * screen when scrolling within the visualization region.
 */
$(window).scroll(function() {
  var scrollLoc = $(window).scrollTop();
  var inRegion = scrollLoc > SCROLL_TOP;
  inRegion = inRegion && scrollLoc < SCROLL_BOTTOM

  if(inRegion) {
    $('#title-bar').addClass('scrolled');
    $('#viz-padding').addClass('scrolled');
    $('.display-panel-caption').addClass('scrolled');
    $('.display-panel-label').addClass('scrolled');
    $('#title').addClass('scrolled');
  } else {
    $('#title-bar').removeClass('scrolled');
    $('#viz-padding').removeClass('scrolled');
    $('.display-panel-caption').removeClass('scrolled');
    $('.display-panel-label').removeClass('scrolled');
    $('#title').removeClass('scrolled');
  }
});
