import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class JobItemDetails extends Component {
  state = {
    JobItemData: {},
    similarJobsList: [],
    skillsList: [],
    lifeAtCompanyDetails: {},
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getFormattedData = eachData => ({
    companyLogoUrl: eachData.company_logo_url,
    companyWebsiteUrl: eachData.company_website_url,
    employmentType: eachData.employment_type,
    id: eachData.id,
    jobDescription: eachData.job_description,
    location: eachData.location,
    packagePerAnnum: eachData.package_per_annum,
    rating: eachData.rating,
    title: eachData.title,
  })

  getLifeAtCompany = companyLifeData => ({
    description: companyLifeData.description,
    imageUrl: companyLifeData.image_url,
  })

  getSkillsData = skillData => ({
    skillImageUrl: skillData.image_url,
    skillName: skillData.name,
  })

  getEachSimilarJobsData = similarJob => ({
    similarCompanyLogoUrl: similarJob.company_logo_url,
    similarEmploymentType: similarJob.employment_type,
    similarId: similarJob.id,
    similarJobDescription: similarJob.job_description,
    similarLocation: similarJob.location,
    similarRating: similarJob.rating,
    similarTitle: similarJob.title,
  })

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobDetailsApiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      console.log(response)
      const updatedData = this.getFormattedData(fetchedData.job_details)
      const lifeAtCompanyDetails = this.getLifeAtCompany(
        fetchedData.job_details.life_at_company,
      )
      const updatedSkillsData = fetchedData.job_details.skills.map(eachSkill =>
        this.getSkillsData(eachSkill),
      )
      const similarJobsData = fetchedData.similar_jobs.map(eachSimilarJob =>
        this.getEachSimilarJobsData(eachSimilarJob),
      )
      // console.log(updatedData)
      // console.log(lifeAtCompanyDetails)
      // console.log(updatedSkillsData)
      // console.log(similarJobsData)
      this.setState({JobItemData: updatedData})
    }
  }

  render() {
    return (
      <div className="job-item-card">
        <h1 className="heading">Job item details</h1>
      </div>
    )
  }
}

export default JobItemDetails
