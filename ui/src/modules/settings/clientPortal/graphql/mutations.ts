import { commonFields } from './queries';

const createOrUpdateConfig = `
  mutation clientPortalConfigUpdate(
    $_id: String
    $name: String
    $description: String
    $logo: String
    $icon: String
    $url: String
    $domain: String
    $knowledgeBaseLabel: String
    $knowledgeBaseTopicId: String
    $ticketLabel: String
    $taskPublicBoardId: String
    $taskPublicPipelineId: String
    $taskLabel: String
    $taskStageId: String
    $taskPipelineId: String
    $taskBoardId: String
    $ticketStageId: String
    $ticketPipelineId: String
    $ticketBoardId: String
    $styles: StylesParams
    $advanced: AdvancedParams
    $css: String
    $mobileResponsive: Boolean
  ) {
    clientPortalConfigUpdate(
      _id: $_id,
      name: $name,
      description: $description,
      url: $url,
      logo: $logo,
      icon: $icon,
      domain: $domain,
      knowledgeBaseLabel: $knowledgeBaseLabel,
      knowledgeBaseTopicId: $knowledgeBaseTopicId,
      taskPublicBoardId: $taskPublicBoardId,
      taskPublicPipelineId: $taskPublicPipelineId,
      ticketLabel: $ticketLabel,
      taskLabel: $taskLabel,
      taskStageId: $taskStageId,
      taskPipelineId: $taskPipelineId,
      taskBoardId: $taskBoardId,
      ticketStageId: $ticketStageId,
      ticketPipelineId: $ticketPipelineId,
      ticketBoardId: $ticketBoardId
      styles: $styles
      advanced: $advanced
      css: $css
      mobileResponsive: $mobileResponsive
    ) {
      ${commonFields}
    }
  }
`;

export default { createOrUpdateConfig };
