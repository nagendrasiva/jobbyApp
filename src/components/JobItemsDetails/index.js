import {Component} from 'react'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'

import Cookies from 'js-cookie'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

import './index.css'

class JobItemDetails extends Component {
  state = {
    jobItemData: {},
    similarJobsList: [],
    skillsList: [],
    lifeAtCompanyList: {},
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
      this.setState({
        jobItemData: updatedData,
        similarJobsList: similarJobsData,
        skillsList: updatedSkillsData,
        lifeAtCompanyList: lifeAtCompanyDetails,
      })
    }
  }

  renderSuccessView = () => {
    const {
      jobItemData,
      similarJobsList,
      skillsList,
      lifeAtCompanyList,
    } = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobItemData

    return (
      <>
        <div className="job-item-details-card">
          <div className="job-details-title-container">
            <img
              className="job-company-logo-image"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="job-name-rating-container">
              <h1 className="job-details-title-heading">{title}</h1>
              <div className="job-logo-rating-container">
                <BsFillStarFill className="job-details-star-logo" />
                <p className="job-details-rating-number">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-location-and-package-container">
            <div className="job-details-location-and-job-type-container">
              <MdLocationOn className="job-location-logo" />
              <p className="job-location-name">{location}</p>
              <BsFillBriefcaseFill className="job-location-logo" />
              <p className="job-location-name">{employmentType}</p>
            </div>
            <p className="job-details-package-per-annum-text">
              {packagePerAnnum}
            </p>
          </div>
          <hr className="horizontal-line" />
          <div className="heading-visit-container">
            <h1 className="job-details-description-heading">Description</h1>
            <a
              className="visit-text"
              target="_blank"
              href={companyWebsiteUrl}
              rel="noreferrer"
            >
              Visit <BiLinkExternal className="visit-logo" />
            </a>
          </div>
          <p className="job-details-description">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="all-skills-container">
            {skillsList.map(eachSkill => (
              <li className="skill-container" key={eachSkill.skillName}>
                <img
                  className="skill-image"
                  src={eachSkill.skillImageUrl}
                  alt={eachSkill.skillName}
                />
                <p className="skill-text">{eachSkill.skillName}</p>
              </li>
            ))}
          </ul>
          <div className="life-at-company-container">
            <div className="life-text-container">
              <h1 className="life-at-company-heading">Life at Company</h1>
              <p className="life-at-company-description">
                {lifeAtCompanyList.description}
              </p>
            </div>
            <img
              className="life-at-company-image"
              src={lifeAtCompanyList.imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-card-container">
          {similarJobsList.map(eachJob => (
            <SimilarJobs key={eachJob.id} similarJobsDetails={eachJob} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    return (
      <div className="job-item-details-card-container">
        <Header />
        {this.renderSuccessView()}
      </div>
    )
  }
}

export default JobItemDetails
