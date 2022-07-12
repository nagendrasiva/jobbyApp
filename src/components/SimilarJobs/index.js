import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarJob = props => {
  const {similarJobsDetails} = props
  const {
    similarCompanyLogoUrl,
    similarEmploymentType,
    similarId,
    similarJobDescription,
    similarLocation,
    similarRating,
    similarTitle,
  } = similarJobsDetails

  return (
    <li className="similar-job-list-item">
      <div className="similar-job-title-container">
        <img
          className="similar-job-company-logo-image"
          src={similarCompanyLogoUrl}
          alt="similar job company logo"
        />
        <div className="similar-job-name-rating-container">
          <h1 className="similar-job-details-title-heading">{similarTitle}</h1>
          <div className="similar-job-logo-rating-container">
            <BsFillStarFill className="similar-job-details-star-logo" />
            <p className="similar-job-details-rating-number">{similarRating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-job-description-heading">Description</h1>
      <p className="similar-job-description">{similarJobDescription}</p>
      <div className="similar-location-and-job-type-container">
        <MdLocationOn className="similar-job-location-logo" />
        <p className="similar-job-location-name">{similarLocation}</p>
        <BsFillBriefcaseFill className="similar-job-location-logo" />
        <p className="similar-job-location-name">{similarEmploymentType}</p>
      </div>
    </li>
  )
}

export default SimilarJob
