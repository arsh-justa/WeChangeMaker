export interface NGOScoreComponents {
  avgRatingScore: number
  volunteerEngagementScore: number  
  impactMetricsScore: number
  timelyReportingScore: number
  profileCompletenessScore: number
}

export interface ScoringWeights {
  avgRating: number
  volunteerEngagement: number
  impactMetrics: number
  timelyReporting: number
  profileCompleteness: number
}

// Default scoring weights (must sum to 100)
export const DEFAULT_WEIGHTS: ScoringWeights = {
  avgRating: 30,
  volunteerEngagement: 20, 
  impactMetrics: 20,
  timelyReporting: 15,
  profileCompleteness: 15
}

export class AllocationScoringEngine {
  private weights: ScoringWeights

  constructor(weights: ScoringWeights = DEFAULT_WEIGHTS) {
    this.weights = this.validateWeights(weights)
  }

  private validateWeights(weights: ScoringWeights): ScoringWeights {
    const total = Object.values(weights).reduce((sum, weight) => sum + weight, 0)
    if (Math.abs(total - 100) > 0.01) {
      throw new Error('Scoring weights must sum to 100')
    }
    return weights
  }

  /**
   * Calculate individual score components for an NGO
   */
  calculateScoreComponents(data: {
    avgRating?: number
    totalRatings?: number
    volunteersEngaged?: number
    impactMetricsSubmitted?: number
    totalDrives?: number
    onTimeReports?: number
    profileFields?: number
    totalProfileFields?: number
  }): NGOScoreComponents {
    
    // Average Rating Score (0-100)
    const avgRatingScore = this.calculateRatingScore(data.avgRating, data.totalRatings)
    
    // Volunteer Engagement Score (0-100)  
    const volunteerEngagementScore = this.calculateEngagementScore(data.volunteersEngaged)
    
    // Impact Metrics Score (0-100)
    const impactMetricsScore = this.calculateImpactScore(data.impactMetricsSubmitted, data.totalDrives)
    
    // Timely Reporting Score (0-100)
    const timelyReportingScore = this.calculateReportingScore(data.onTimeReports, data.totalDrives)
    
    // Profile Completeness Score (0-100)
    const profileCompletenessScore = this.calculateProfileScore(data.profileFields, data.totalProfileFields)

    return {
      avgRatingScore,
      volunteerEngagementScore,
      impactMetricsScore, 
      timelyReportingScore,
      profileCompletenessScore
    }
  }

  /**
   * Calculate composite score using weighted components
   */
  calculateCompositeScore(components: NGOScoreComponents): number {
    const composite = 
      (components.avgRatingScore * this.weights.avgRating / 100) +
      (components.volunteerEngagementScore * this.weights.volunteerEngagement / 100) +
      (components.impactMetricsScore * this.weights.impactMetrics / 100) +
      (components.timelyReportingScore * this.weights.timelyReporting / 100) +
      (components.profileCompletenessScore * this.weights.profileCompleteness / 100)
    
    return Math.round(composite * 100) / 100 // Round to 2 decimal places
  }

  private calculateRatingScore(avgRating?: number, totalRatings?: number): number {
    if (!avgRating || !totalRatings) return 0
    
    // Minimum ratings threshold for reliability
    const minRatingsThreshold = 5
    const reliabilityFactor = Math.min(totalRatings / minRatingsThreshold, 1)
    
    // Convert 5-star rating to 0-100 scale
    const baseScore = (avgRating / 5) * 100
    
    // Apply reliability factor
    return Math.round(baseScore * reliabilityFactor)
  }

  private calculateEngagementScore(volunteersEngaged?: number): number {
    if (!volunteersEngaged) return 0
    
    // Logarithmic scale for volunteer engagement
    // Score plateaus at around 500 volunteers to prevent unfair advantage
    const maxVolunteers = 500
    const normalizedEngagement = Math.min(volunteersEngaged / maxVolunteers, 1)
    
    // Apply logarithmic curve
    return Math.round(Math.log(normalizedEngagement + 0.1) * 43.4 + 100)
  }

  private calculateImpactScore(metricsSubmitted?: number, totalDrives?: number): number {
    if (!totalDrives || totalDrives === 0) return 0
    if (!metricsSubmitted) return 0
    
    const completionRate = metricsSubmitted / totalDrives
    return Math.round(Math.min(completionRate, 1) * 100)
  }

  private calculateReportingScore(onTimeReports?: number, totalDrives?: number): number {
    if (!totalDrives || totalDrives === 0) return 100 // Perfect score if no drives
    if (!onTimeReports) return 0
    
    const onTimeRate = onTimeReports / totalDrives
    return Math.round(Math.min(onTimeRate, 1) * 100)
  }

  private calculateProfileScore(completedFields?: number, totalFields?: number): number {
    if (!totalFields || totalFields === 0) return 100
    if (!completedFields) return 0
    
    const completionRate = completedFields / totalFields
    return Math.round(Math.min(completionRate, 1) * 100)
  }

  /**
   * Update scoring weights (must be called by admin)
   */
  updateWeights(newWeights: ScoringWeights, adminUserId: string, reason: string): ScoringWeights {
    this.weights = this.validateWeights(newWeights)
    
    // In real implementation, log this change to audit trail
    console.log(`Scoring weights updated by ${adminUserId}: ${reason}`, newWeights)
    
    return this.weights
  }

  /**
   * Get current weights
   */
  getWeights(): ScoringWeights {
    return { ...this.weights }
  }
}

/**
 * Utility function to calculate allocation percentages for NGOs
 */
export function calculateFundAllocation(
  ngoScores: Array<{ ngoId: string; score: number }>,
  totalFund: number
): Array<{ ngoId: string; allocation: number; percentage: number }> {
  
  const totalScore = ngoScores.reduce((sum, ngo) => sum + ngo.score, 0)
  
  if (totalScore === 0) {
    // Equal distribution if all scores are 0
    const equalShare = totalFund / ngoScores.length
    return ngoScores.map(ngo => ({
      ngoId: ngo.ngoId,
      allocation: equalShare,
      percentage: 100 / ngoScores.length
    }))
  }
  
  return ngoScores.map(ngo => ({
    ngoId: ngo.ngoId,
    allocation: (ngo.score / totalScore) * totalFund,
    percentage: (ngo.score / totalScore) * 100
  }))
}

/**
 * Detect anomalies in NGO performance that might indicate gaming
 */
export function detectAnomalies(data: {
  suddenRatingSpikes?: boolean
  highCancellationRate?: boolean
  suspiciousMetrics?: boolean
}): Array<{ type: string; severity: 'low' | 'medium' | 'high'; description: string }> {
  const anomalies = []
  
  if (data.suddenRatingSpikes) {
    anomalies.push({
      type: 'rating_spike',
      severity: 'medium' as const,
      description: 'Unusual spike in ratings detected - requires manual review'
    })
  }
  
  if (data.highCancellationRate) {
    anomalies.push({
      type: 'high_cancellations',
      severity: 'high' as const,
      description: 'High volunteer no-show rate may indicate coordination issues'
    })
  }
  
  if (data.suspiciousMetrics) {
    anomalies.push({
      type: 'suspicious_metrics',
      severity: 'high' as const,
      description: 'Reported impact metrics appear inconsistent - verification required'
    })
  }
  
  return anomalies
}